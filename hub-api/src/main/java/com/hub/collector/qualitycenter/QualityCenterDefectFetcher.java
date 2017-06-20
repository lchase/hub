package com.hub.collector.qualitycenter;

import com.google.common.base.Strings;
import com.hub.api.qualitycenter.model.QualityCenterDefect;
import com.hub.api.qualitycenter.model.QualityCenterQuery;
import com.hub.api.qualitycenter.model.QualityCenterQueryComponent;
import com.hub.api.qualitycenter.repository.QualityCenterDefectRepository;
import com.hub.api.qualitycenter.repository.QualityCenterQueryRepository;
import com.hub.collector.qualitycenter.xml.QualityCenterDefectsResponse;
import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.simplexml.SimpleXmlConverterFactory;

import java.io.IOException;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@PropertySource("classpath:quality_center.properties")
@Component
public class QualityCenterDefectFetcher {

    private static final Logger log = LoggerFactory.getLogger(QualityCenterDefectFetcher.class);

    private static final DateTimeFormatter queryDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final int MAX_PAGE_SIZE = 500;

    private final QualityCenterDefectRepository defectRepository;
    private final QualityCenterQueryRepository queryRepository;

    @Autowired
    public QualityCenterDefectFetcher(QualityCenterDefectRepository defectRepository, QualityCenterQueryRepository queryRepository) {
        this.defectRepository = defectRepository;
        this.queryRepository = queryRepository;
    }

    @Value("${quality_center.base_url}")
    private String BASE_URL;

    @Value("${quality_center.domain}")
    private String DOMAIN;

    @Value("${quality_center.project}")
    private String PROJECT;

    @Value("${quality_center.username}")
    private String USERNAME;

    @Value("${quality_center.password}")
    private String PASSWORD;

    //@Scheduled(cron = "0 * * * * *")	//Once every minute at the 0th second
    //@Scheduled(fixedRate = 5000)
    public void fetchDefectsFromQualityCenter() {
        try {
            log.info("QualityCenterDefectFetcher: execution started at {}", Instant.now().toString());
            validateConfiguration();

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(new HttpLoggingInterceptor())
                    .readTimeout(5, TimeUnit.MINUTES)
                    .build();

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(SimpleXmlConverterFactory.create())
                    .build();

            QualityCenterEndpointInterface qcEndpoint = retrofit.create(QualityCenterEndpointInterface.class);

            Call<ResponseBody> loginCall = qcEndpoint.login(createQcAuthenticationPhrase(USERNAME, PASSWORD));
            Response<ResponseBody> loginResponse = loginCall.execute();
            String authCookie = loginResponse.headers().get("Set-Cookie");

            executeAllStoredQueries(qcEndpoint, authCookie);

            log.info("QualityCenterDefectFetcher: execution ended at {}", Instant.now().toString());
        } catch (Exception e) {
            log.error("QualityCenterDefectFetcher encountered an error: ", e);
        }
    }

    private String createQcAuthenticationPhrase(String username, String password) {
        String authInfo = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(authInfo.getBytes());
    }

    private void validateConfiguration() {
        if (Strings.isNullOrEmpty(BASE_URL) || Strings.isNullOrEmpty(DOMAIN) || Strings.isNullOrEmpty(PROJECT) ||
                Strings.isNullOrEmpty(USERNAME) || Strings.isNullOrEmpty(PASSWORD)) {
            throw new IllegalStateException("Some of the required configuration settings for the quality center defect fetcher were " +
                    "not present.  Check your /resources/quality_center.properties file!");
        }
    }

    private String createFilterQueryString(Collection<QualityCenterQueryComponent> queryComponents) {
        StringBuilder query = new StringBuilder();
        query.append("{");
        queryComponents.forEach((component) -> {
            if (query.length() > 1) {
                query.append(';');
            }
            query.append(component.getFieldName()).append('[').append(component.getExpression()).append(']');
        });
        query.append("}");
        return query.toString();
    }

    /**
     *
     * @return
     */
    private void executeAllStoredQueries(QualityCenterEndpointInterface qcEndpoint, String authCookie) throws IOException {
        log.info("Fetching defects from Quality Center for all stored queries.");
        List<QualityCenterQuery> queriesToExecute = queryRepository.findAll();
        for (QualityCenterQuery query : queriesToExecute) {
            List<QualityCenterDefect> queriedDefects = executeSingleQuery(qcEndpoint, authCookie, query);
            defectRepository.save(queriedDefects);
        }
        log.info("FINISHED - Fetching defects from Quality Center for all stored queries.");
    }

    private List<QualityCenterDefect> executeSingleQuery(
            QualityCenterEndpointInterface qcEndpoint,
            String authCookie, QualityCenterQuery query)
            throws IOException {
        log.info("Fetching defects from Quality Center for query: " + query);

        String filterQueryString = createFilterQueryString(query.getComponents());
        Call<QualityCenterDefectsResponse> defectsCall =
                qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, MAX_PAGE_SIZE, filterQueryString);
        Response<QualityCenterDefectsResponse> defectsResponse = defectsCall.execute();
        QualityCenterDefectsResponse deserializedResponse = defectsResponse.body();

        //TODO: handle paging case where query contains more defects than max page size
        //The client indicates the position of the next entity to retrieve with the query parameter start-index.
        //The following URL gets the third page of a query that has 10 entities per page:
        //http://SERVER:PORT/qcbin/rest/domains/DOMAIN_NAME/projects/PROJECT_NAME/defects?page-size=10&start-index=30
//        if (deserializedResponse.defectCount > MAX_PAGE_SIZE) {
//
//        }

        log.info("FINISHED: Fetching defects from Quality Center for query");
        return convertResponseToDefectEntities(deserializedResponse);
    }

    private QualityCenterDefectsResponse getAllDefects(QualityCenterEndpointInterface qcEndpoint, String authCookie) throws IOException {
        Call<QualityCenterDefectsResponse> defectsCall =
                qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, 1000, null);
        Response<QualityCenterDefectsResponse> defectsResponse = defectsCall.execute();

        return defectsResponse.body();
    }

    private List<QualityCenterDefect> convertResponseToDefectEntities(QualityCenterDefectsResponse response) {
        return response.entities.stream().map(QualityCenterDefect::new)
                .collect(Collectors.toList());
    }
}
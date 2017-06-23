package com.hub.collector.qualitycenter;

import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import com.hub.api.qualitycenter.model.QualityCenterDefect;
import com.hub.api.qualitycenter.model.QualityCenterQuery;
import com.hub.api.qualitycenter.service.QualityCenterService;
import com.hub.collector.qualitycenter.xml.QualityCenterDefectsResponse;
import okhttp3.JavaNetCookieJar;
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
import java.net.CookieManager;
import java.net.CookiePolicy;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@PropertySource("classpath:quality_center.properties")
@Component
public class QualityCenterDefectFetcher {

    private static final Logger log = LoggerFactory.getLogger(QualityCenterDefectFetcher.class);

    private static final DateTimeFormatter lastModifiedDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final int MAX_PAGE_SIZE = 5000;

    private static final List<QualityCenterField> supportedQueryFields;

    private final QualityCenterService qcService;

    static {
        QualityCenterField[] test = new QualityCenterField[] {
                QualityCenterField.DefectID,
                QualityCenterField.Summary,
                QualityCenterField.Reproducible,
                QualityCenterField.DetectedBy,
                QualityCenterField.AssignTo,
                //QualityCenterField.Status,
                QualityCenterField.Severity,
                QualityCenterField.TargetVersion,
                QualityCenterField.Product,
                QualityCenterField.Subsystem,
                QualityCenterField.Component,
                QualityCenterField.FoundinRelease,
                QualityCenterField.Type,
                QualityCenterField.Rootcause,
                QualityCenterField.Tags,
                QualityCenterField.Priority,
                QualityCenterField.State,
                QualityCenterField.TargetRelease,
                QualityCenterField.LastChangeBy,
                QualityCenterField.DetectedonDate,
                QualityCenterField.ReadyforTestDate,
                QualityCenterField.CodeCompleteDate,
                QualityCenterField.ReadyForBuildDate,
                QualityCenterField.ClosedDate,
                QualityCenterField.DevReqCloseDate,
                QualityCenterField.LastChangeDate
        };
        supportedQueryFields = ImmutableList.copyOf(test);
    }

    @Autowired
    public QualityCenterDefectFetcher(QualityCenterService qcService) {
        this.qcService = qcService;
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

            QualityCenterEndpoint qcEndpoint = getQualityCenterEndpoint();

            Call<ResponseBody> loginCall = qcEndpoint.login(createQcAuthenticationPhrase(USERNAME, PASSWORD));
            loginCall.execute();

            executeAllStoredQueries(qcEndpoint);

            log.info("QualityCenterDefectFetcher: execution ended at {}", Instant.now().toString());
        } catch (Exception e) {
            log.error("QualityCenterDefectFetcher encountered an error: ", e);
        }
    }

    private QualityCenterEndpoint getQualityCenterEndpoint() {
        HttpLoggingInterceptor logger = new HttpLoggingInterceptor();
        logger.setLevel(HttpLoggingInterceptor.Level.BASIC);
        //logger.setLevel(HttpLoggingInterceptor.Level.BODY);

        CookieManager cookieManager = new CookieManager();
        cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);

        OkHttpClient client = new OkHttpClient.Builder()
                .addNetworkInterceptor(logger)
                .cookieJar(new JavaNetCookieJar(cookieManager))
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(5, TimeUnit.MINUTES)
                .writeTimeout(10, TimeUnit.SECONDS)
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(SimpleXmlConverterFactory.create())
                .build();

        return retrofit.create(QualityCenterEndpoint.class);
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

    private String createFilterQueryString(QualityCenterQuery query) {
        StringBuilder filter = new StringBuilder();
        filter.append("{");
        query.getComponents().forEach(component -> {
            if (filter.length() > 1) {
                filter.append(';');
            }
            filter.append(component.getFieldName()).append('[').append(component.getExpression()).append(']');
        });
        //Only return defects that have been modified since the last successful query execution
        //TODO: if nothing was updated recently, this returns an empty list.  Need to figure out a way to determine difference
        //between a defect no longer being part of the query or one that was simply not modified.
//        if (query.getLastSuccessfulExecution() != null) {
//            filter.append(';');
//            ZonedDateTime zdt = ZonedDateTime.ofInstant(query.getLastSuccessfulExecution().toInstant(), ZoneId.of("Israel"));
//            filter.append(QualityCenterField.LastChangeDate.physicalName())
//                    .append('[')
//                    .append(">= ").append(zdt.format(lastModifiedDateFormatter))
//                    .append(']');
//        }
        filter.append("}");
        return filter.toString();
    }

    private String createSparseFieldsetString() {
        StringBuilder sb = new StringBuilder();

        supportedQueryFields.forEach(field -> {
            if (sb.length() > 0) {
                sb.append(",");
            }
            sb.append(field.physicalName());
        });

        return sb.toString();
    }

    private void executeAllStoredQueries(QualityCenterEndpoint qcEndpoint) throws IOException {
        log.info("Fetching defects from Quality Center for all stored queries.");
        List<QualityCenterQuery> queriesToExecute = qcService.findAllQueries();
        for (QualityCenterQuery query : queriesToExecute) {
            Set<QualityCenterDefect> associatedDefects = executeSingleQuery(qcEndpoint, query);
            qcService.saveQueryResults(query, associatedDefects);
        }
        log.info("FINISHED - Fetching defects from Quality Center for all stored queries.");
    }

    private Set<QualityCenterDefect> executeSingleQuery(
            QualityCenterEndpoint qcEndpoint,
            QualityCenterQuery query)
            throws IOException {
        log.info("Fetching defects from Quality Center for query: " + query);

        Call<QualityCenterDefectsResponse> defectsCall =
                qcEndpoint.getDefectsByQuery(DOMAIN, PROJECT, MAX_PAGE_SIZE,
                        createFilterQueryString(query), createSparseFieldsetString());
        Response<QualityCenterDefectsResponse> defectsResponse = defectsCall.execute();
        QualityCenterDefectsResponse deserializedResponse = defectsResponse.body();

        log.info("FINISHED: Fetching defects from Quality Center for query");
        return convertResponseToDefectEntities(deserializedResponse);
    }

    private Set<QualityCenterDefect> convertResponseToDefectEntities(QualityCenterDefectsResponse response) {
        if (response.entities == null) {
            return Collections.emptySet();
        }
        return response.entities.stream().map(QualityCenterDefect::new)
                .collect(Collectors.toSet());
    }
}
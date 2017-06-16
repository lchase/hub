package com.hub.collector.qualitycenter;

import com.google.common.base.Strings;
import com.google.common.collect.ImmutableMap;
import com.hub.collector.qualitycenter.xml.QualityCenterDefectsResponse;
import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.simplexml.SimpleXmlConverterFactory;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@PropertySource("classpath:quality_center.properties")
@Component
public class QualityCenterDefectFetcher {

    private static final Logger log = LoggerFactory.getLogger(QualityCenterDefectFetcher.class);

    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final DateTimeFormatter queryDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

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

            QualityCenterDefectsResponse allDefects = getAllDefects(qcEndpoint, authCookie);

//            Call<QualityCenterDefectResponse> defectCall = qcEndpoint.getDefectById(authCookie, DOMAIN, PROJECT, 195970);
//            Response<QualityCenterDefectResponse> defectResponse = defectCall.execute();
//
//            Call<QualityCenterDefectsResponse> defectsCall =
//                    qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, getWfmQuery());
//            Response<QualityCenterDefectsResponse> defectsResponse = defectsCall.execute();
//
//            Call<ResponseBody> defectsCall =
//                    qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, getWfmQuery());
//            Response<ResponseBody> defectsResponse = defectsCall.execute();

            log.info("QualityCenterDefectFetcher: execution ended at time {}", dateFormat.format(Instant.now()));
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

    private String createFilterQueryString(Map<String, String> filterOptions) {
        StringBuilder query = new StringBuilder();
        query.append("{");
        filterOptions.forEach((key, value) -> {
            if (query.length() > 1) {
                query.append(';');
            }
            query.append(key).append('[').append(value).append(']');
        });
        query.append("}");
        return query.toString();
    }

    private String getWfmQuery() {
        ImmutableMap<String, String> filterOptions = ImmutableMap.<String, String>builder()
                .put(QualityCenterField.Product.physicalName(), "\"WFM Web Suite\" Or \"WFM-Core\" Or \"Report Framework\"")
                .put(QualityCenterField.TargetVersion.physicalName(), "\"15.1 FP1\"")
                .put(QualityCenterField.TargetRelease.physicalName(), "NOT \"HF*\"")
                .put(QualityCenterField.Type.physicalName(), "Bug")
                .put(QualityCenterField.Subsystem.physicalName(), "Not (Documentation Or \"Doc: Online Help\" Or \"SFP\" Or \"RFS\" Or \"Retail Financial Services\" Or \"RFS Scheduling\" Or \"Request Management\")")
                .put(QualityCenterField.Component.physicalName(), "Not (\"My Requests\")")
                .put(QualityCenterField.Category.physicalName(), "Not Localization")
                .put(QualityCenterField.LastChangeDate.physicalName(), "> " +
                        queryDateFormat.format(LocalDate.now().minus(7, ChronoUnit.DAYS)))
                .build();

        return createFilterQueryString(filterOptions);
    }

    private QualityCenterDefectsResponse getAllDefects(QualityCenterEndpointInterface qcEndpoint, String authCookie) throws IOException {
        Call<QualityCenterDefectsResponse> defectsCall =
                qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, String.valueOf(500), null);
        Response<QualityCenterDefectsResponse> defectsResponse = defectsCall.execute();

        return defectsResponse.body();
    }
}
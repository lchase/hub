package com.hub.collector.qualitycenter;

import com.google.common.base.Strings;
import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import okhttp3.logging.HttpLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.simplexml.SimpleXmlConverterFactory;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@PropertySource("classpath:quality_center.properties")
@Component
public class QualityCenterDefectFetcher {

	private static final Logger log = LoggerFactory.getLogger(QualityCenterDefectFetcher.class);

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

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
	@Scheduled(fixedRate = 5000)
	public void fetchDefectsFromQualityCenter() {
		//private static final String URL_GET_DEFECT_BY_QUERY = "rest/domains/{0}/projects/{1}/defects?query={{{2}}}";
//		var requestDefect = WebRequest.Create(GetFullUrl(URL_GET_DEFECT_BY_QUERY, domain, project, QualityCenterField.Summary + "['*" + title.Replace("'", "\\'") + "*']"));

		try {
			validateConfiguration();

			OkHttpClient client = new OkHttpClient.Builder()
					.addInterceptor(new HttpLoggingInterceptor())
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

			Call<QualityCenterDefectXmlResponse> defectCall = qcEndpoint.getDefectById(authCookie, DOMAIN, PROJECT, 195970);
			Response<QualityCenterDefectXmlResponse> defectResponse = defectCall.execute();

//			Call<List<QualityCenterDefectXmlResponse>> defectsCall =
//					qcEndpoint.getDefectsByQuery(authCookie, DOMAIN, PROJECT, "test");
//			Response<List<QualityCenterDefectXmlResponse>> defectsResponse = defectsCall.execute();

			log.info("QualityCenterDefectFetcher: execution ended at time {}", dateFormat.format(new Date()));
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
			throw new IllegalStateException("Some of the required configuration settings for the quality center defect fetcher were" +
					"not present.  Check your /resources/quality_center.properties file!");
		}
	}
}
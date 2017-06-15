package com.hub.collector.qualitycenter;


import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;
import retrofit2.http.Query;

import java.util.List;

public interface QualityCenterEndpointInterface {

	@GET("authentication-point/authenticate")
	Call<ResponseBody> login(@Header("Authorization") String authInfo);

	@GET("rest/domains/{domain}/projects/{project}/defects/{id}")
	Call<QualityCenterDefectXmlResponse> getDefectById(
			@Header("Cookie") String authCookie,
			@Path("domain") String domain,
			@Path("project") String project,
			@Path("id") int id);

	@GET("rest/domains/{domain}/projects/{project}/defects?query={{{query}}}")
	Call<List<QualityCenterDefectXmlResponse>> getDefectsByQuery(
			@Header("Cookie") String authCookie,
			@Path("domain") String domain,
			@Path("project") String project,
			@Query("fieldType") String query);
}

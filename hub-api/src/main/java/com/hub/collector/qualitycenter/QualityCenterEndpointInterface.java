package com.hub.collector.qualitycenter;


import com.hub.collector.qualitycenter.xml.QualityCenterDefectResponse;
import com.hub.collector.qualitycenter.xml.QualityCenterDefectsResponse;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface QualityCenterEndpointInterface {

    @GET("authentication-point/authenticate")
    Call<ResponseBody> login(@Header("Authorization") String authInfo);

    @GET("rest/domains/{domain}/projects/{project}/defects/{id}")
    Call<QualityCenterDefectResponse> getDefectById(
            @Header("Cookie") String authCookie,
            @Path("domain") String domain,
            @Path("project") String project,
            @Path("id") int id);

    @GET("rest/domains/{domain}/projects/{project}/defects")
    Call<QualityCenterDefectsResponse> getDefectsByQuery(
            @Header("Cookie") String authCookie,
            @Path("domain") String domain,
            @Path("project") String project,
            @Query("page-size") String size,
            @Query("query") String query);
}

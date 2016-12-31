package com.hub.api.model;

import io.katharsis.resource.annotations.JsonApiId;
import io.katharsis.resource.annotations.JsonApiResource;

import java.sql.Timestamp;

/**
 * This is essentially a mapping of UsersEntity.  Katharsis can generate an endpoint
 * directly from the entity, so this mapping is not always required.  However, if you
 * need to do processing/calculation of fields on the entity before they are sent to
 * the user, you can create a Dto like this one and a separate repository to handle
 * it.
 */
@JsonApiResource(type = "user")
public class UsersDto {

    @JsonApiId
    private Integer id;

    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String resetPwdToken;
    private Timestamp resetPwdExpires;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetPwdToken() {
        return resetPwdToken;
    }

    public void setResetPwdToken(String resetPwdToken) {
        this.resetPwdToken = resetPwdToken;
    }

    public Timestamp getResetPwdExpires() {
        return resetPwdExpires;
    }

    public void setResetPwdExpires(Timestamp resetPwdExpires) {
        this.resetPwdExpires = resetPwdExpires;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}

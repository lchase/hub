package com.hub.api.security;

import java.io.Serializable;


public class UserRegistrationRequest implements Serializable {

    private String email;
    private String password;
    private String firstName;

    public UserRegistrationRequest() {
        super();
    }

    public UserRegistrationRequest(String email, String password, String firstName, String lastName) {
        this.setEmail(email);
        this.setPassword(password);
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    private String lastName;
}

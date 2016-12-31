package com.hub.api.model;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "Users")
public class UsersEntity {
    @Id
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String resetPwdToken;
    private Timestamp resetPwdExpires;
    @Basic
    @Column(name = "createdAt")
    private Timestamp createdAt;
    private Timestamp updatedAt;

    //@Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "lastName")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "resetPwdToken")
    public String getResetPwdToken() {
        return resetPwdToken;
    }

    public void setResetPwdToken(String resetPwdToken) {
        this.resetPwdToken = resetPwdToken;
    }

    @Basic
    @Column(name = "resetPwdExpires")
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

    @Basic
    @Column(name = "updatedAt")
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsersEntity that = (UsersEntity) o;

        if (id != that.id) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (firstName != null ? !firstName.equals(that.firstName) : that.firstName != null) return false;
        if (lastName != null ? !lastName.equals(that.lastName) : that.lastName != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (resetPwdToken != null ? !resetPwdToken.equals(that.resetPwdToken) : that.resetPwdToken != null)
            return false;
        if (resetPwdExpires != null ? !resetPwdExpires.equals(that.resetPwdExpires) : that.resetPwdExpires != null)
            return false;
        if (createdAt != null ? !createdAt.equals(that.createdAt) : that.createdAt != null) return false;
        if (updatedAt != null ? !updatedAt.equals(that.updatedAt) : that.updatedAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (resetPwdToken != null ? resetPwdToken.hashCode() : 0);
        result = 31 * result + (resetPwdExpires != null ? resetPwdExpires.hashCode() : 0);
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        result = 31 * result + (updatedAt != null ? updatedAt.hashCode() : 0);
        return result;
    }
}

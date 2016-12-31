package com.hub.api.security.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "User")
public class User {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    @Column(name = "Username", unique = true)
    @NotNull
    @Size(min = 4, max = 255)
    private String username;

    @Column(name = "Password")
    @NotNull
    @Size(min = 4, max = 255)
    private String password;

    @Column(name = "FirstName")
    @NotNull
    @Size(min = 4, max = 100)
    private String firstName;

    @Column(name = "LastName")
    @NotNull
    @Size(min = 4, max = 100)
    private String lastName;

    @Column(name = "Email")
    @NotNull
    @Size(min = 4, max = 255)
    private String email;

    @Column(name = "Enabled")
    @NotNull
    private boolean enabled;

    @Column(name = "LastPasswordResetDate")
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date lastPasswordResetDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "UserAuthority",
            joinColumns = {@JoinColumn(name = "UserId", referencedColumnName = "Id")},
            inverseJoinColumns = {@JoinColumn(name = "AuthorityId", referencedColumnName = "Id")})
    private List<Authority> authorities;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    public List<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }
}

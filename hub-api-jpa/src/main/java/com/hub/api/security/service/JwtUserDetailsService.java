package com.hub.api.security.service;

import com.hub.api.security.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface JwtUserDetailsService extends UserDetailsService {

    void createUser(User user);
}

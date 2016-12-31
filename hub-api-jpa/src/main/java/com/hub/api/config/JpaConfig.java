package com.hub.api.config;

import io.katharsis.spring.jpa.SpringTransactionRunner;
import org.springframework.context.annotation.Bean;

public class JpaConfig {

    @Bean
    public SpringTransactionRunner transactionRunner() {
        return new SpringTransactionRunner();
    }
}

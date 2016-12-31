package com.hub.api.config;

import com.hub.api.model.UsersDto;
import com.hub.api.model.UsersEntity;
import io.katharsis.internal.boot.TransactionRunner;
import io.katharsis.jpa.JpaModule;
import io.katharsis.jpa.JpaRepositoryConfig;
import io.katharsis.jpa.mapping.JpaMapper;
import io.katharsis.jpa.query.Tuple;
import io.katharsis.validation.ValidationModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class ModuleConfig {

    @Autowired
    private EntityManager em;

    @Autowired
    private TransactionRunner transactionRunner;

    /**
     * Bean Validation
     * @return module
     */
    @Bean
    public ValidationModule validationModule() {
        return ValidationModule.newInstance();
    }

    /**
     * Expose JPA entities as repositories.
     * @return module
     */
    @Bean
    public JpaModule jpaModule() {
        JpaModule module = JpaModule.newServerModule(em, transactionRunner);

        // directly expose entity
        module.addRepository(JpaRepositoryConfig.builder(UsersEntity.class).build());

        // additionally expose entity as a mapped dto
        module.addRepository(JpaRepositoryConfig.builder(UsersEntity.class, UsersDto.class,
                new UserMapper()).build());

//        // register a computed a attribute
//        // you may consider QueryDSL or generating the Criteria query objects.
//        JpaCriteriaQueryFactory queryFactory = (JpaCriteriaQueryFactory) module.getQueryFactory();
//        queryFactory.registerComputedAttribute(UsersEntity.class, "upperName", String.class,
//                new JpaCriteriaExpressionFactory<From<?, UsersEntity>>() {
//
//                    @SuppressWarnings({ "rawtypes", "unchecked" })
//                    @Override
//                    public Expression<String> getExpression(From<?, UsersEntity> entity, CriteriaQuery<?> query) {
//                        CriteriaBuilder builder = em.getCriteriaBuilder();
//                        return builder.upper((Expression) entity.get("name"));
//                    }
//                });

        return module;
    }

    class UserMapper implements JpaMapper<UsersEntity, UsersDto> {

        @Override
        public UsersDto map(Tuple tuple) {
            UsersDto dto = new UsersDto();

            // first entry in tuple is the queried entity (if not configured otherwise)
            UsersEntity entity = tuple.get(0, UsersEntity.class);
            dto.setId(entity.getId());
            //dto.setName(entity.getName());

            // computed attribute available as additional tuple entry
            //dto.setUpperName(tuple.get(1, String.class));
            return dto;
        }

        @Override
        public UsersEntity unmap(UsersDto dto) {
            // get entity from database if already there
            UsersEntity entity = em.find(UsersEntity.class, dto.getId());
            if (entity == null) {
                entity = new UsersEntity();
                entity.setId(dto.getId());
            }
            //entity.setName(dto.getName());
            return entity;
        }

    }
}

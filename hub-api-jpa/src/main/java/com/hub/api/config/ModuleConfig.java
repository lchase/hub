package com.hub.api.config;

import com.hub.api.dashboard.model.DashboardEntity;
import com.hub.api.dashboard.model.DashboardWidgetEntity;
import com.hub.api.dashboard.model.WidgetEntity;
import com.hub.api.dto.UserDto;
import com.hub.api.model.PreferenceEntity;
import com.hub.api.organization.model.OrganizationUnitEntity;
import com.hub.api.security.model.Authority;
import com.hub.api.security.model.User;
import com.hub.api.workflow.model.Workflow;
import com.hub.api.workflow.model.WorkflowRun;
import com.hub.api.workflow.model.WorkflowStep;
import com.hub.api.workflow.model.WorkflowStepRun;
import io.katharsis.core.internal.boot.TransactionRunner;
import io.katharsis.jpa.JpaModule;
import io.katharsis.jpa.JpaRepositoryConfig;
import io.katharsis.jpa.JpaRepositoryFilter;
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
    public JpaModule jpaModule(JpaRepositoryFilter jpaRepositoryFilter) {
        JpaModule module = JpaModule.newServerModule(em, transactionRunner);

        module.addFilter(jpaRepositoryFilter);

        // directly expose entity
        // TODO: do this automatically for all entities
        module.addRepository(JpaRepositoryConfig.builder(User.class).build());
        module.addRepository(JpaRepositoryConfig.builder(Authority.class).build());
        module.addRepository(JpaRepositoryConfig.builder(PreferenceEntity.class).build());
        module.addRepository(JpaRepositoryConfig.builder(OrganizationUnitEntity.class).build());
        module.addRepository(JpaRepositoryConfig.builder(Workflow.class).build());
        module.addRepository(JpaRepositoryConfig.builder(WorkflowRun.class).build());
        module.addRepository(JpaRepositoryConfig.builder(WorkflowStep.class).build());
        module.addRepository(JpaRepositoryConfig.builder(WorkflowStepRun.class).build());
        module.addRepository(JpaRepositoryConfig.builder(DashboardEntity.class).build());
        module.addRepository(JpaRepositoryConfig.builder(WidgetEntity.class).build());

        module.addRepository(JpaRepositoryConfig.builder(DashboardWidgetEntity.class).build());

        // additionally expose entity as a mapped dto
        module.addRepository(JpaRepositoryConfig.builder(User.class, UserDto.class, new UserMapper()).build());

//        // register a computed a attribute
//        // you may consider QueryDSL or generating the Criteria query objects.
//        JpaCriteriaQueryFactory queryFactory = (JpaCriteriaQueryFactory) module.getQueryFactory();
//        queryFactory.registerComputedAttribute(UserEntity.class, "upperName", String.class,
//                new JpaCriteriaExpressionFactory<From<?, UserEntity>>() {
//
//                    @SuppressWarnings({ "rawtypes", "unchecked" })
//                    @Override
//                    public Expression<String> getExpression(From<?, UserEntity> entity, CriteriaQuery<?> query) {
//                        CriteriaBuilder builder = em.getCriteriaBuilder();
//                        return builder.upper((Expression) entity.get("name"));
//                    }
//                });

        return module;
    }

    class UserMapper implements JpaMapper<User, UserDto> {

        @Override
        public UserDto map(Tuple tuple) {
            UserDto dto = new UserDto();

            // first entry in tuple is the queried entity (if not configured otherwise)
            User entity = tuple.get(0, User.class);
            dto.setId(entity.getId());
            //dto.setName(entity.getName());

            // computed attribute available as additional tuple entry
            //dto.setUpperName(tuple.get(1, String.class));
            return dto;
        }

        @Override
        public User unmap(UserDto dto) {
            // get entity from database if already there
            User entity = em.find(User.class, dto.getId());
            if (entity == null) {
                entity = new User();
                entity.setId(dto.getId());
            }
            //entity.setName(dto.getName());
            return entity;
        }

    }
}

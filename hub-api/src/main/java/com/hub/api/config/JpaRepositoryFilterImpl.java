package com.hub.api.config;

import com.hub.api.security.IAuthenticationFacade;
import io.katharsis.jpa.JpaEntityRepository;
import io.katharsis.jpa.JpaRelationshipRepository;
import io.katharsis.jpa.JpaRepositoryFilter;
import io.katharsis.jpa.query.JpaQuery;
import io.katharsis.jpa.query.JpaQueryExecutor;
import io.katharsis.jpa.query.Tuple;
import io.katharsis.queryspec.QuerySpec;
import io.katharsis.resource.list.ResourceList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
public class JpaRepositoryFilterImpl implements JpaRepositoryFilter {

    private final IAuthenticationFacade authenticationFacade;

    @Autowired
    public JpaRepositoryFilterImpl(IAuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    @Override
    public <T, I extends Serializable> JpaEntityRepository<T, I> filterCreation(JpaEntityRepository<T, I> repository) {
        return repository;
    }

    @Override
    public <S, I extends Serializable, T, J extends Serializable>
            JpaRelationshipRepository<S, I, T, J> filterCreation(JpaRelationshipRepository<S, I, T, J> repository) {
        return repository;
    }

    @Override
    public boolean accept(Class<?> resourceType) {
        return true;
    }

    @Override
    public QuerySpec filterQuerySpec(Object repository, QuerySpec querySpec) {
        //TODO: when we want to hook in authorization, we can use the following snippet to get the currently logged
        //in user and then perform authorization checks and/or modify the query before execution
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();

        return querySpec;
    }

    @Override
    public <T> JpaQuery<T> filterQuery(Object repository, QuerySpec querySpec, JpaQuery<T> query) {
        return query;
    }

    @Override
    public <T> JpaQueryExecutor<T> filterExecutor(Object repository, QuerySpec querySpec, JpaQueryExecutor<T> executor) {
        return executor;
    }

    @Override
    public List<Tuple> filterTuples(Object repository, QuerySpec querySpec, List<Tuple> tuples) {
        return tuples;
    }

    @Override
    public <T> ResourceList<T> filterResults(Object repository, QuerySpec querySpec, ResourceList<T> resources) {
        return resources;
    }
}

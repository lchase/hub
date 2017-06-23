package com.hub.api.qualitycenter.service;

import com.hub.api.qualitycenter.model.QualityCenterDefect;
import com.hub.api.qualitycenter.model.QualityCenterQuery;
import com.hub.api.qualitycenter.repository.QualityCenterDefectRepository;
import com.hub.api.qualitycenter.repository.QualityCenterQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Handles the business logic for Quality Center collector.
 */
@Service
@Transactional
public class QualityCenterService {

    private final QualityCenterDefectRepository defectRepository;
    private final QualityCenterQueryRepository queryRepository;

    @Autowired
    public QualityCenterService(QualityCenterDefectRepository defectRepository, QualityCenterQueryRepository queryRepository) {
        this.defectRepository = defectRepository;
        this.queryRepository = queryRepository;
    }

    public List<QualityCenterQuery> findAllQueries() {
        return queryRepository.findAll();
    }

    /**
     * Creates/updates the given QC defects and links them to the given query.
     */
    public void saveQueryResults(QualityCenterQuery query, Set<QualityCenterDefect> associatedDefects) {
        defectRepository.save(associatedDefects);
        query.setLastSuccessfulExecution(new Date());
        query.setDefects(associatedDefects);
        queryRepository.save(query);
    }
}

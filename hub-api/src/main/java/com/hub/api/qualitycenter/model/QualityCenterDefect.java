package com.hub.api.qualitycenter.model;

import com.hub.collector.qualitycenter.xml.QualityCenterDefectResponse;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "quality_center_defects", schema = "hub")
public class QualityCenterDefect {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Summary")
    @NotNull
    private String summary;

    @Column(name = "Description")
    @NotNull
    private String description;

    @Column(name = "IsReproducible")
    @NotNull
    private boolean isReproducible;

    @Column(name = "DetectedBy")
    @NotNull
    private String detectedBy;

    @Column(name = "AssignedTo")
    @NotNull
    private String assignedTo;

    @Column(name = "Status")
    @NotNull
    private String status;

    @Column(name = "Severity")
    @NotNull
    private String severity;

    @Column(name = "TargetVersion")
    @NotNull
    private String targetVersion;

    @Column(name = "Product")
    @NotNull
    private String product;

    @Column(name = "SubSystem")
    @NotNull
    private String subSystem;

    @Column(name = "Component")
    @NotNull
    private String component;

    @Column(name = "FoundInRelease")
    @NotNull
    private String foundInRelease;

    @Column(name = "FileAsType")
    @NotNull
    private String fileAsType;

    @Column(name = "Source")
    @NotNull
    private String source;

    @Column(name = "Tags")
    @NotNull
    private String tags;

    @Column(name = "Priority")
    @NotNull
    private String priority;

    @Column(name = "State")
    @NotNull
    private String state;

    @Column(name = "TargetRelease")
    @NotNull
    private String targetRelease;

    @Column(name = "LastChangedBy")
    @NotNull
    private String lastChangedBy;

    @Column(name = "DetectedOnDate")
    @NotNull
    private Date detectedOnDate;

    @Column(name = "ReadyForTestDate")
    @NotNull
    private Date readyForTestDate;

    @Column(name = "CodeCompleteDate")
    @NotNull
    private Date codeCompleteDate;

    @Column(name = "ReadyForBuildDate")
    @NotNull
    private Date readyForBuildDate;

    @Column(name = "ClosedDate")
    @NotNull
    private Date closedDate;

    @Column(name = "DevReqClosedDate")
    @NotNull
    private Date devReqClosedDate;

    @Column(name = "LastChangeDate")
    @NotNull
    private Date lastChangeDate;

    /**
     * Creates a QualityCenterDefect entity from an XML response object coming from the QC API.
     * @param response
     */
    public QualityCenterDefect(QualityCenterDefectResponse response) {
        throw new UnsupportedOperationException("Not implemented");
    }
}

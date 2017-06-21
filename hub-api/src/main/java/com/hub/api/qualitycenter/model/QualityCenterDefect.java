package com.hub.api.qualitycenter.model;

import com.hub.collector.qualitycenter.QualityCenterField;
import com.hub.collector.qualitycenter.xml.QualityCenterDefectResponse;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "quality_center_defects", schema = "hub")
public class QualityCenterDefect {

    @Id
    @Column(name = "Id")
    @NotNull
    private int id;

    @Lob
    @Column(name = "Summary")
    private String summary;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "IsReproducible")
    private boolean isReproducible;

    @Column(name = "DetectedBy")
    private String detectedBy;

    @Column(name = "AssignedTo")
    private String assignedTo;

    @Column(name = "Status", length = 15)
    private String status;

    @Column(name = "Severity", length = 15)
    private String severity;

    @Column(name = "TargetVersion", length = 20)
    private String targetVersion;

    @Column(name = "Product")
    @NotNull
    private String product;

    @Column(name = "SubSystem")
    private String subSystem;

    @Column(name = "Component")
    private String component;

    @Column(name = "FoundInRelease")
    private String foundInRelease;

    @Column(name = "FileAsType")
    private String fileAsType;

    @Column(name = "Source")
    private String source;

    @Column(name = "Tags")
    private String tags;

    @Column(name = "Priority", length = 20)
    private String priority;

    @Column(name = "State", length = 20)
    private String state;

    @Column(name = "TargetRelease", length = 20)
    private String targetRelease;

    @Column(name = "LastChangedBy")
    private String lastChangedBy;


    @Column(name = "DetectedOnDate")
    private Date detectedOnDate;

    @Column(name = "ReadyForTestDate")
    private Date readyForTestDate;

    @Column(name = "CodeCompleteDate")
    private Date codeCompleteDate;

    @Column(name = "ReadyForBuildDate")
    private Date readyForBuildDate;

    @Column(name = "ClosedDate")
    private Date closedDate;

    @Column(name = "DevReqClosedDate")
    private Date devReqClosedDate;

    @Column(name = "LastChangeDate")
    private Date lastChangeDate;

    public QualityCenterDefect() {

    }

    /**
     * Creates a QualityCenterDefect entity from an XML response object coming from the QC API.
     *
     * @param response
     */
    public QualityCenterDefect(QualityCenterDefectResponse response) {
        this.id = response.getFieldIntValue(QualityCenterField.DefectID);
        this.summary = response.getFieldValue(QualityCenterField.Summary);
        this.description = response.getFieldValue(QualityCenterField.Description);
        this.isReproducible = response.getFieldBooleanValue(QualityCenterField.Reproducible);
        this.detectedBy = response.getFieldValue(QualityCenterField.DetectedBy);
        this.assignedTo = response.getFieldValue(QualityCenterField.AssignTo);
        this.status = response.getFieldValue(QualityCenterField.Status);
        this.severity = response.getFieldValue(QualityCenterField.Severity);
        this.targetVersion = response.getFieldValue(QualityCenterField.TargetVersion);
        this.product = response.getFieldValue(QualityCenterField.Product);

        this.subSystem = response.getFieldValue(QualityCenterField.Subsystem);
        this.component = response.getFieldValue(QualityCenterField.Component);
        this.foundInRelease = response.getFieldValue(QualityCenterField.FoundinRelease);
        this.fileAsType = response.getFieldValue(QualityCenterField.Type);
        //Not sure if this one is correct
        this.source = response.getFieldValue(QualityCenterField.Rootcause);
        this.tags = response.getFieldValue(QualityCenterField.Tags);
        this.priority = response.getFieldValue(QualityCenterField.Priority);
        this.state = response.getFieldValue(QualityCenterField.State);
        this.targetRelease = response.getFieldValue(QualityCenterField.TargetRelease);
        this.lastChangedBy = response.getFieldValue(QualityCenterField.LastChangeBy);

        this.detectedOnDate = response.getFieldDateValue(QualityCenterField.DetectedonDate);
        this.readyForTestDate = response.getFieldDateValue(QualityCenterField.ReadyforTestDate);
        this.codeCompleteDate = response.getFieldDateValue(QualityCenterField.CodeCompleteDate);
        this.readyForBuildDate = response.getFieldDateValue(QualityCenterField.ReadyForBuildDate);
        this.closedDate = response.getFieldDateValue(QualityCenterField.ClosedDate);
        this.devReqClosedDate = response.getFieldDateValue(QualityCenterField.DevReqCloseDate);
        this.lastChangeDate = response.getFieldDateValue(QualityCenterField.LastChangeDate);
    }

    public int getId() {
        return id;
    }

    public void setId(int defectId) {
        this.id = defectId;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isReproducible() {
        return isReproducible;
    }

    public void setReproducible(boolean reproducible) {
        isReproducible = reproducible;
    }

    public String getDetectedBy() {
        return detectedBy;
    }

    public void setDetectedBy(String detectedBy) {
        this.detectedBy = detectedBy;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getTargetVersion() {
        return targetVersion;
    }

    public void setTargetVersion(String targetVersion) {
        this.targetVersion = targetVersion;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getSubSystem() {
        return subSystem;
    }

    public void setSubSystem(String subSystem) {
        this.subSystem = subSystem;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getFoundInRelease() {
        return foundInRelease;
    }

    public void setFoundInRelease(String foundInRelease) {
        this.foundInRelease = foundInRelease;
    }

    public String getFileAsType() {
        return fileAsType;
    }

    public void setFileAsType(String fileAsType) {
        this.fileAsType = fileAsType;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTargetRelease() {
        return targetRelease;
    }

    public void setTargetRelease(String targetRelease) {
        this.targetRelease = targetRelease;
    }

    public String getLastChangedBy() {
        return lastChangedBy;
    }

    public void setLastChangedBy(String lastChangedBy) {
        this.lastChangedBy = lastChangedBy;
    }

    public Date getDetectedOnDate() {
        return detectedOnDate;
    }

    public void setDetectedOnDate(Date detectedOnDate) {
        this.detectedOnDate = detectedOnDate;
    }

    public Date getReadyForTestDate() {
        return readyForTestDate;
    }

    public void setReadyForTestDate(Date readyForTestDate) {
        this.readyForTestDate = readyForTestDate;
    }

    public Date getCodeCompleteDate() {
        return codeCompleteDate;
    }

    public void setCodeCompleteDate(Date codeCompleteDate) {
        this.codeCompleteDate = codeCompleteDate;
    }

    public Date getReadyForBuildDate() {
        return readyForBuildDate;
    }

    public void setReadyForBuildDate(Date readyForBuildDate) {
        this.readyForBuildDate = readyForBuildDate;
    }

    public Date getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(Date closedDate) {
        this.closedDate = closedDate;
    }

    public Date getDevReqClosedDate() {
        return devReqClosedDate;
    }

    public void setDevReqClosedDate(Date devReqClosedDate) {
        this.devReqClosedDate = devReqClosedDate;
    }

    public Date getLastChangeDate() {
        return lastChangeDate;
    }

    public void setLastChangeDate(Date lastChangeDate) {
        this.lastChangeDate = lastChangeDate;
    }
}

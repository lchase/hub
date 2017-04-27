package com.hub.api.workitem.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "work_items", schema = "hub")
public class WorkItem {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "DataSourceId")
    @NotNull
    private String dataSourceId;

    @Column(name = "ExternalId")
    @NotNull
    private String externalId;

    @Column(name = "Summary")
    @NotNull
    private String summary;

    @Column(name = "Detail")
    @NotNull
    private String detail;

    @Column(name = "CreatedAt")
    @NotNull
    private Timestamp createdAt;

    @Column(name = "ResolvedAt")
    private Timestamp resolvedAt;

    @Column(name = "ReOpenedAt")
    private Timestamp reOpenedAt;

    @Column(name = "ClosedAt")
    private Timestamp closedAt;

    @Column(name = "Severity")
    @NotNull
    private String severity;

    @Column(name = "Status")
    @NotNull
    private String status;

    @Column(name = "UpdatedAt")
    @NotNull
    private Timestamp updatedAt;

    @Column(name = "Creator")
    @NotNull
    private String creator;

    @Column(name = "Assignee")
    @NotNull
    private String assignee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(String dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(Timestamp resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public Timestamp getReOpenedAt() {
        return reOpenedAt;
    }

    public void setReOpenedAt(Timestamp reOpenedAt) {
        this.reOpenedAt = reOpenedAt;
    }

    public Timestamp getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(Timestamp closedAt) {
        this.closedAt = closedAt;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }
}

package com.hub.api.workflow.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "workflow_step_runs", schema = "hub")
public class WorkflowStepRun {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "WorkflowStepId")
    @NotNull
    private int workflowStepId;

    @Column(name = "WorkflowRunId")
    @NotNull
    private int workflowRunId;

    @Column(name = "Status")
    @NotNull
    private String status;

    @Column(name = "Start")
    @NotNull
    private Date start;

    @Column(name = "Duration")
    @NotNull
    private String duration;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWorkflowStepId() {
        return workflowStepId;
    }

    public void setWorkflowStepId(int workflowStepId) {
        this.workflowStepId = workflowStepId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public int getWorkflowRunId() {
        return workflowRunId;
    }

    public void setWorkflowRunId(int workflowRunId) {
        this.workflowRunId = workflowRunId;
    }
}

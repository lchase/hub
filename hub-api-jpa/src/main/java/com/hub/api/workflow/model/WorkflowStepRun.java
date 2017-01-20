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
    private String workflowStepId;

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

    public String getWorkflowStepId() {
        return workflowStepId;
    }

    public void setWorkflowStepId(String workflowStepId) {
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
}

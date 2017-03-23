package com.hub.api.workflow.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "workflow_runs", schema = "hub")
public class WorkflowRun {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /*
    @Column(name = "WorkflowId")
    @NotNull
    private String workflowId;
    */

    @Column(name= "Name")
    @NotNull
    private String name;

    @Column(name = "Uri")
    @NotNull
    private String uri;

    @Column(name = "Status")
    @NotNull
    private String status;

    @Column(name = "Start")
    @NotNull
    private Date start;

    @Column(name = "Duration")
    @NotNull
    private float duration;

    @ManyToOne
    @JoinColumn(name = "WorkflowId")
    private Workflow workflow;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    /*
    public String getWorkflowId() {
        return workflowId;
    }

    public void setWorkflowId(String workflowId) {
        this.workflowId = workflowId;
    }*/

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
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

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }
}

package com.hub.api.workflow.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "workflow_steps", schema = "hub")
public class WorkflowStep {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "WorkflowId")
    @NotNull
    private String workflowId;

    @Column(name = "Uri")
    @NotNull
    private String uri;

    @Column(name = "Name")
    @NotNull
    private String name;

    @Column(name = "Description")
    @NotNull
    private String description;

    /* escaped because Order is a keyword */
    @Column(name = "\"Order\"")
    @NotNull
    private int order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkflowId() {
        return workflowId;
    }

    public void setWorkflowId(String workflowId) {
        this.workflowId = workflowId;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}

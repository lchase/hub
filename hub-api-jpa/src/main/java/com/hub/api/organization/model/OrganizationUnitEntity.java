package com.hub.api.organization.model;

import com.hub.api.workflow.model.Workflow;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "organization_units", schema = "hub")
public class OrganizationUnitEntity {
    @Id
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    @NotNull
    private String name;

    @Column(name = "Description")
    @NotNull
    private String description;

    @Column(name = "IsPublic")
    @NotNull
    private String isPublic;

    @Column(name = "CreatedBy")
    @NotNull
    private int createdBy;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
            name="organization_unit_workflows",
            joinColumns = @JoinColumn(name="OrganizationUnitId", referencedColumnName = "Id"),
            inverseJoinColumns = @JoinColumn(name="WorkflowId", referencedColumnName = "Id")

    )
    private List<Workflow> workflows;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        createdBy = createdBy;
    }

    public String getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(String isPublic) {
        this.isPublic = isPublic;
    }

    public List<Workflow> getWorkflows() {
        return workflows;
    }

    public void setWorkflows(List<Workflow> workflows) {
        this.workflows = workflows;
    }
}

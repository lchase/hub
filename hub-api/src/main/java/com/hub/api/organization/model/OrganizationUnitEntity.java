package com.hub.api.organization.model;

import com.hub.api.workflow.model.Workflow;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "organization_units", schema = "hub")
public class OrganizationUnitEntity {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Name")
    @NotNull
    private String name;

    @Column(name = "Description")
    @NotNull
    private String description;

    @Column(name = "IsPublic")
    @NotNull
    private boolean isPublic;

    @Column(name = "CreatedBy")
    @NotNull
    private int createdBy;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
            name="organization_unit_workflows",
            joinColumns = @JoinColumn(name="OrganizationUnitId", referencedColumnName = "Id"),
            inverseJoinColumns = @JoinColumn(name="WorkflowId", referencedColumnName = "Id")

    )
    private Set<Workflow> workflows;

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
        this.createdBy = createdBy;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Set<Workflow> getWorkflows() {
        return workflows;
    }

    public void setWorkflows(Set<Workflow> workflows) {
        this.workflows = workflows;
    }
}

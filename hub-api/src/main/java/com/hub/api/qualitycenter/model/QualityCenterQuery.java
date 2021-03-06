package com.hub.api.qualitycenter.model;

import com.hub.api.organization.model.OrganizationUnitEntity;
import com.hub.api.workflow.model.Workflow;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="quality_center_queries", schema="hub")
public class QualityCenterQuery {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="Name")
    @NotNull
    private String name;

    @Column(name="LastSuccessfulExecution")
    private Date lastSuccessfulExecution;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="OrganizationUnitId")
    @NotNull
    private OrganizationUnitEntity organizationUnit;

    @OneToMany(fetch=FetchType.EAGER, mappedBy="query")
    private Set<QualityCenterQueryComponent> components;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
            name="quality_center_queries_defects",
            joinColumns = @JoinColumn(name="QualityCenterQueryId", referencedColumnName = "Id"),
            inverseJoinColumns = @JoinColumn(name="QualityCenterDefectId", referencedColumnName = "Id")

    )
    private Set<QualityCenterDefect> defects;

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

    public Date getLastSuccessfulExecution() {
        return lastSuccessfulExecution;
    }

    public void setLastSuccessfulExecution(Date lastSucessfulExecution) {
        this.lastSuccessfulExecution = lastSucessfulExecution;
    }

    public OrganizationUnitEntity getOrganizationUnit() {
        return organizationUnit;
    }

    public void setOrganizationUnit(OrganizationUnitEntity organizationUnit) {
        this.organizationUnit = organizationUnit;
    }

    public Set<QualityCenterQueryComponent> getComponents() {
        return components;
    }

    public void setComponents(Set<QualityCenterQueryComponent> components) {
        this.components = components;
    }

    public Set<QualityCenterDefect> getDefects() {
        return defects;
    }

    public void setDefects(Set<QualityCenterDefect> defects) {
        this.defects = defects;
    }

    @Override
    public String toString() {
        return "QualityCenterQuery{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastSuccessfulExecution=" + lastSuccessfulExecution +
                ", organizationUnit=" + organizationUnit +
                ", components=" + components +
                '}';
    }
}

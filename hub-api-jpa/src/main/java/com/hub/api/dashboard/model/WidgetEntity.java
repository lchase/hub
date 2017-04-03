package com.hub.api.dashboard.model;

import com.hub.api.dashboard.model.DashboardWidgetEntity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "widgets", schema = "hub")
public class WidgetEntity {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Basic
    @Column(name = "Name")
    private String name;

    @Basic
    @Column(name = "Description")
    private String description;

    @Basic
    @Column(name = "CreatedAt")
    private Timestamp createdAt;

    @Basic
    @Column(name = "UpdatedAt")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "widget")
    private List<DashboardWidgetEntity> dashboards;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DashboardWidgetEntity> getDashboards() {
        return dashboards;
    }

    public void setDashboards(List<DashboardWidgetEntity> dashboards) {
        this.dashboards = dashboards;
    }
}

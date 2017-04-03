package com.hub.api.dashboard.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "dashboard_widgets", schema = "hub")
public class DashboardWidgetEntity {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "DashboardId")
    private DashboardEntity dashboard;

    @ManyToOne
    @JoinColumn(name = "WidgetId")
    private WidgetEntity widget;

    @Basic
    @Column(name = "Row")
    private Integer row;

    @Basic
    @Column(name = "Column")
    private Integer column;

    @Basic
    @Column(name = "CreatedAt")
    private Timestamp createdAt;

    @Basic
    @Column(name = "UpdatedAt")
    private Timestamp updatedAt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public DashboardEntity getDashboard() {
        return dashboard;
    }

    public void setDashboard(DashboardEntity dashboard) {
        this.dashboard = dashboard;
    }

    public WidgetEntity getWidget() {
        return widget;
    }

    public void setWidget(WidgetEntity widget) {
        this.widget = widget;
    }

    public Integer getRow() {
        return row;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getColumn() {
        return column;
    }

    public void setColumn(Integer column) {
        this.column = column;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DashboardWidgetEntity that = (DashboardWidgetEntity) o;

        if (id != that.id) return false;
        if (!dashboard.equals(that.dashboard)) return false;
        if (!widget.equals(that.widget)) return false;
        if (!row.equals(that.row)) return false;
        if (!column.equals(that.column)) return false;
        if (!createdAt.equals(that.createdAt)) return false;
        return updatedAt != null ? updatedAt.equals(that.updatedAt) : that.updatedAt == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + dashboard.hashCode();
        result = 31 * result + widget.hashCode();
        result = 31 * result + row.hashCode();
        result = 31 * result + column.hashCode();
        result = 31 * result + createdAt.hashCode();
        result = 31 * result + (updatedAt != null ? updatedAt.hashCode() : 0);
        return result;
    }
}

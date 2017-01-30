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
    @Basic
    @Column(name = "Column")
    private int column;
    @Basic
    @Column(name = "Row")
    private int row;
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

    public int getColumn() {
        return column;
    }
    public void setColumn(int col) {
        this.column = col;
    }

    public int getRow() {
        return row;
    }
    public void setRow(int row) {
        this.row = row;
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
        if (column != that.column) return false;
        if (row != that.row) return false;
        if (createdAt != null ? !createdAt.equals(that.createdAt) : that.createdAt != null) return false;
        if (updatedAt != null ? !updatedAt.equals(that.updatedAt) : that.updatedAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + column;
        result = 31 * result + row;
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        result = 31 * result + (updatedAt != null ? updatedAt.hashCode() : 0);
        return result;
    }
}

package com.hub.api.dashboard.model;

import com.hub.api.security.model.User;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "dashboards", schema = "hub")
public class DashboardEntity {
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

//    @Basic
//    @Column(name = "UserId")
//    private Long userId;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @Basic
    @Column(name = "CreatedAt")
    private Timestamp createdAt;

    @Basic
    @Column(name = "UpdatedAt")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "dashboard")
    private List<DashboardWidgetEntity> widgets;

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

    public Long getUserId() {
        return getUser().getId();
    }

//    public Long getUserId() {
//        return getUser().getId();
//    }
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<DashboardWidgetEntity> getWidgets() {
        return widgets;
    }

    public void setWidgets(List<DashboardWidgetEntity> widgets) {
        this.widgets = widgets;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DashboardEntity that = (DashboardEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (createdAt != null ? !createdAt.equals(that.createdAt) : that.createdAt != null) return false;
        if (updatedAt != null ? !updatedAt.equals(that.updatedAt) : that.updatedAt != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        result = 31 * result + (updatedAt != null ? updatedAt.hashCode() : 0);
        return result;
    }
}

package com.hub.api.qualitycenter.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "quality_center_query_components", schema = "hub")
public class QualityCenterQueryComponent {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "FieldName")
    @NotNull
    private String fieldName;

    @Column(name = "Expression")
    @NotNull
    private String expression;

    @ManyToOne
    @JoinColumn(name = "QualityCenterQueryId")
    private QualityCenterQuery query;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public QualityCenterQuery getQuery() {
        return query;
    }

    public void setQuery(QualityCenterQuery query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "QualityCenterQueryComponent{" +
                "id=" + id +
                ", fieldName='" + fieldName + '\'' +
                ", expression='" + expression + '\'' +
                ", query=" + query.getName() +
                '}';
    }
}

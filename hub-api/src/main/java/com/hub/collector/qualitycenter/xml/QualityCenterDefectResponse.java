package com.hub.collector.qualitycenter.xml;

import com.hub.collector.qualitycenter.QualityCenterField;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementMap;
import org.simpleframework.xml.Root;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;

@Root(name = "Entity")
public class QualityCenterDefectResponse {

    private static final DateTimeFormatter queryDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public QualityCenterDefectResponse() {
    }

    @ElementMap(name = "Fields", entry = "Field", key = "Name", attribute = true)
    private Map<String, QualityCenterDefectFieldResponse> fields;

    //For defects, type should always be of type "defect"
    @Attribute(name = "Type")
    public String type;

    public String getFieldValue(QualityCenterField fieldName) {
        QualityCenterDefectFieldResponse field = fields.get(fieldName.physicalName());
        if (field != null) {
            return fields.get(fieldName.physicalName()).value;
        }
        return null;
    }

    public Integer getFieldIntValue(QualityCenterField fieldName) {
        String fieldStringValue = getFieldValue(fieldName);
        if (fieldStringValue != null) {
            return Integer.parseInt(fieldStringValue);
        }
        return null;
    }

    public boolean getFieldBooleanValue(QualityCenterField fieldName) {
        return Boolean.parseBoolean(getFieldValue(fieldName));
    }

    public Date getFieldDateValue(QualityCenterField fieldName) {
        String fieldStringValue = getFieldValue(fieldName);

        if (fieldStringValue != null) {
            LocalDate date = LocalDate.parse(fieldStringValue, queryDateFormat);

            return Date.from(date.atStartOfDay().toInstant(ZoneOffset.UTC));
        }
        return null;
    }
}

package com.hub.collector.qualitycenter.xml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

import java.util.List;

@Root(name = "Entity")
public class QualityCenterDefectResponse {

    public QualityCenterDefectResponse() {
    }

    @ElementList(name = "Fields")
    public List<QualityCenterDefectFieldResponse> fields;

    //For defects, type should always be of type "defect"
    @Attribute(name = "Type")
    public String type;
}

package com.hub.collector.qualitycenter.xml;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Element
public class QualityCenterDefectFieldResponse {
    public QualityCenterDefectFieldResponse() {
    }

    @Attribute(name = "Name")
    public String name;

    @Element(name = "Value", required = false)
    public String value;
}
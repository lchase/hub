package com.hub.collector.qualitycenter;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Element
public class QualityCenterDefectFieldXml {
	public QualityCenterDefectFieldXml() {}

	@Attribute(name = "Name")
	public String name;

	@Element(name = "Value", required = false)
	public String value;
}
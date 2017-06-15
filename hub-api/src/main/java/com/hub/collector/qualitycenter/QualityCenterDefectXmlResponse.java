package com.hub.collector.qualitycenter;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

import java.util.List;

@Root(name = "Entity")
public class QualityCenterDefectXmlResponse {
	public QualityCenterDefectXmlResponse() {}

	@ElementList(name = "Fields")
	public List<QualityCenterDefectFieldXml> fields;

	//For defects, type should always be of type "defect"
	@Attribute(name = "Type")
	public String type;
}

package com.hub.collector.qualitycenter.xml;


import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

import java.util.List;
import java.util.Set;

@Root(name = "Entities")
public class QualityCenterDefectsResponse {
    public QualityCenterDefectsResponse() {
    }

    @ElementList(inline=true, required=false)
    public List<QualityCenterDefectResponse> entities;

    @Attribute(name = "TotalResults")
    public int defectCount;
}

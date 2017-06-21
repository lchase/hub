package com.hub.collector.qualitycenter.xml;

import org.simpleframework.xml.Root;
import org.simpleframework.xml.Text;

@Root
public class QualityCenterDefectFieldResponse {
    public QualityCenterDefectFieldResponse() {
    }

    @Text
    public String value;

    @Override
    public String toString() {
        return value;
    }
}
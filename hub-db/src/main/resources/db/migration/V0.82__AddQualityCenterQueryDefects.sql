create table quality_center_queries_defects
(
	QualityCenterQueryId int not null,
	QualityCenterDefectId int not null,
	primary key (QualityCenterQueryId, QualityCenterDefectId),
	constraint qcqd_QualityCenterDefectId_QualityCenterQueryId_uindex
		unique (QualityCenterDefectId, QualityCenterQueryId),
	constraint quality_center_queries_defects_quality_center_queries_Id_fk
		foreign key (QualityCenterQueryId) references hub.quality_center_queries (Id),
	constraint quality_center_queries_defects_quality_center_defects_Id_fk
		foreign key (QualityCenterDefectId) references hub.quality_center_defects (Id)
)
comment 'Associates defects with the query or queries from which they were retrieved'
;

create index quality_center_queries_defects_QualityCenterQueryId_index
	on quality_center_queries_defects (QualityCenterQueryId)
;
create table quality_center_queries
(
	Id int auto_increment
		primary key,
	Name varchar(255) not null,
	LastSuccessfulExecution datetime null,
	OrganizationUnitId int not null,
	constraint FK_quality_center_queries_organization_units
	foreign key (OrganizationUnitId) references hub.organization_units (Id)
)
;
CREATE UNIQUE INDEX quality_center_queries_Name_OrganizationUnitId_uindex ON hub.quality_center_queries (Name, OrganizationUnitId);

create table quality_center_query_components
(
	Id int auto_increment
		primary key,
	FieldName varchar(50) not null,
	Expression varchar(1000) not null,
	QualityCenterQueryId int not null,
	constraint FK_quality_center_query_components_quality_center_queries
	foreign key (QualityCenterQueryId) references hub.quality_center_queries (Id)
)
;

INSERT INTO organization_units (Name, Description, isPublic, CreatedBy) VALUES ('Firebirds', 'Core-WFM team', 1, -1);
INSERT INTO organization_units (Name, Description, isPublic, CreatedBy) VALUES ('Don\'t Panic', 'Foundation team', 1, -1);
INSERT INTO organization_units (Name, Description, isPublic, CreatedBy) VALUES ('QueueX', 'Queue Analytics team', 1, -1);

INSERT INTO quality_center_queries (LastSuccessfulExecution, OrganizationUnitId, Name) VALUES (NULL, 1, 'Firebirds');

INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('\"WFM Web Suite\" Or \"WFM-Core\" Or \"Report Framework\"', 'user-04', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('\"15.1 FP1\"', 'user-16', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('Not \"HF*\"', 'user-15', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('Bug', 'user-42', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('Not (Documentation Or \"Doc: Online Help\" Or \"SFP\" Or \"RFS\" Or \"Retail Financial Services\" Or \"RFS Scheduling\" Or \"Request Management\")', 'user-07', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('Not (\"My Requests\")', 'user-76', 1);
INSERT INTO quality_center_query_components (Expression, FieldName, QualityCenterQueryId) VALUES ('Not Localization', 'user-12', 1);
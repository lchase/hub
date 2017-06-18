create table quality_center_defects
(
	Id int not null
		primary key,
	AssignedTo varchar(255) null,
	ClosedDate datetime null,
	CodeCompleteDate datetime null,
	Component varchar(255) null,
	Description longtext null,
	DetectedBy varchar(255) null,
	DetectedOnDate datetime null,
	DevReqClosedDate datetime null,
	FileAsType varchar(255) null,
	FoundInRelease varchar(255) null,
	IsReproducible bit null,
	LastChangeDate datetime null,
	LastChangedBy varchar(255) null,
	Priority varchar(20) null,
	Product varchar(255) not null,
	ReadyForBuildDate datetime null,
	ReadyForTestDate datetime null,
	Severity varchar(15) null,
	Source varchar(255) null,
	State varchar(20) null,
	Status varchar(15) null,
	SubSystem varchar(255) null,
	Summary longtext null,
	Tags varchar(255) null,
	TargetRelease varchar(20) null,
	TargetVersion varchar(20) null
)
;
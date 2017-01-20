CREATE TABLE `workflows` (
	`Id` INT NOT NULL AUTO_INCREMENT,
	`Uri` VARCHAR(500) NOT NULL,
	`Name` VARCHAR(150) NOT NULL,
	`Description` VARCHAR(500) NOT NULL,
	PRIMARY KEY (`Id`)
)
ENGINE=InnoDB
;

CREATE TABLE `organization_unit_workflows` (
	`OrganizationUnitId` INT(11) NOT NULL,
	`WorkflowId` INT(11) NOT NULL,
	PRIMARY KEY (`OrganizationUnitId`, `WorkflowId`),
	INDEX `FK__workflows` (`WorkflowId`),
	CONSTRAINT `FK__organization_units` FOREIGN KEY (`OrganizationUnitId`) REFERENCES `organization_units` (`Id`),
	CONSTRAINT `FK__workflows` FOREIGN KEY (`WorkflowId`) REFERENCES `workflows` (`Id`)
)
ENGINE=InnoDB
;

CREATE TABLE `workflow_steps` (
	`Id` INT(11) NOT NULL AUTO_INCREMENT,
	`WorkflowId` INT(11) NOT NULL DEFAULT '0',
	`Uri` VARCHAR(500) NOT NULL,
	`Name` VARCHAR(150) NOT NULL,
	`Description` VARCHAR(500) NOT NULL,
	`Order` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`Id`),
	INDEX `FK__workflow_step_workflows` (`WorkflowId`),
	CONSTRAINT `FK__workflow_step_workflows` FOREIGN KEY (`WorkflowId`) REFERENCES `workflows` (`Id`)
)
ENGINE=InnoDB
;

CREATE TABLE `workflow_runs` (
	`Id` BIGINT NOT NULL AUTO_INCREMENT,
	`WorkflowId` INT NOT NULL,
	`Uri` VARCHAR(500) NOT NULL,
	`Status` VARCHAR(150) NOT NULL,
	`Start` DATETIME NOT NULL,
	`Duration` FLOAT NOT NULL,
	PRIMARY KEY (`Id`),
	CONSTRAINT `FK__workflow_run_workflows` FOREIGN KEY (`WorkflowId`) REFERENCES `workflows` (`Id`)
)
ENGINE=InnoDB
;

CREATE TABLE `workflow_step_runs` (
	`Id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`WorkflowStepId` INT(11) NOT NULL,
	`WorkflowRunId` BIGINT NOT NULL,
	`Status` VARCHAR(50) NOT NULL,
	`Start` DATETIME NOT NULL,
	`Duration` FLOAT NOT NULL,
	PRIMARY KEY (`Id`),
	INDEX `FK__workflow_steps` (`WorkflowStepId`),
	CONSTRAINT `FK__workflow_steps` FOREIGN KEY (`WorkflowStepId`) REFERENCES `workflow_steps` (`Id`),
	CONSTRAINT `FK_workflow_step_runs_workflow_runs` FOREIGN KEY (`WorkflowRunId`) REFERENCES `workflow_runs` (`Id`)
)
ENGINE=InnoDB
;


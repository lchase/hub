CREATE TABLE `work_items` (
	`Id` BIGINT NOT NULL AUTO_INCREMENT,
	`DataSourceId` INT NOT NULL,
	`ExternalId` VARCHAR(50) NOT NULL,
	`Summary` VARCHAR(300) NOT NULL,
	`Detail` VARCHAR(1000) NOT NULL,
	`CreatedAt` DATETIME NOT NULL,
	`ResolvedAt` DATETIME NULL,
	`ReOpenedAt` DATETIME NULL,
	`ClosedAt` DATETIME NULL,
	`Severity` VARCHAR(50) NOT NULL,
	`Status` VARCHAR(50) NOT NULL,
	`UpdatedAt` DATETIME NULL,
	`Creator` VARCHAR(150) NULL,
	`Assignee` VARCHAR(150) NULL,
	PRIMARY KEY (`Id`)
)
ENGINE=InnoDB
;

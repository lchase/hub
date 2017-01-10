CREATE TABLE `organization_units` (
	`Id` INT(11) NOT NULL AUTO_INCREMENT,
	`Name` VARCHAR(100) NOT NULL,
	`Description` VARCHAR(500) NOT NULL,
	`IsPublic` BIT NOT NULL DEFAULT b'0',
	`CreatedBy` INT(11) NOT NULL,
	PRIMARY KEY (`Id`),
	INDEX `FK_organization_units_users` (`CreatedBy`),
	CONSTRAINT `FK_organization_units_users` FOREIGN KEY (`CreatedBy`) REFERENCES `users` (`Id`)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
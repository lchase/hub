CREATE TABLE `user` (
	`Id` INT(11) NOT NULL,
	`Username` VARCHAR(255) NOT NULL COLLATE 'latin1_general_ci',
	`Password` VARCHAR(255) NOT NULL COLLATE 'latin1_general_ci',
	`FirstName` VARCHAR(100) NOT NULL COLLATE 'latin1_general_ci',
	`LastName` VARCHAR(100) NOT NULL COLLATE 'latin1_general_ci',
	`Email` VARCHAR(255) NOT NULL COLLATE 'latin1_general_ci',
	`Enabled` BIT(1) NOT NULL,
	`LastPasswordResetDate` DATETIME NOT NULL,
	PRIMARY KEY (`Id`),
	UNIQUE INDEX `User_Username_uindex` (`Username`)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `authority` (
	`Id` INT(11) NOT NULL,
	`Name` VARCHAR(100) NOT NULL COLLATE 'latin1_general_ci',
	PRIMARY KEY (`Id`),
	UNIQUE INDEX `Authority_Id_uindex` (`Id`)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `userauthority` (
	`UserId` INT(11) NOT NULL,
	`AuthorityId` INT(11) NOT NULL,
	INDEX `UserAuthority_User_Id_fk` (`UserId`),
	INDEX `UserAuthority_Authority_Id_fk` (`AuthorityId`),
	CONSTRAINT `UserAuthority_Authority_Id_fk` FOREIGN KEY (`AuthorityId`) REFERENCES `authority` (`Id`),
	CONSTRAINT `UserAuthority_User_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
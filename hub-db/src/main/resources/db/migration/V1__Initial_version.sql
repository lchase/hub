CREATE TABLE Authority
(
    Id INT(11) PRIMARY KEY NOT NULL,
    Name VARCHAR(100) NOT NULL
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
CREATE UNIQUE INDEX Authority_Id_uindex ON Authority (Id);

INSERT INTO Authority (Id, Name) VALUES (1, 'ROLE_USER');
INSERT INTO Authority (Id, Name) VALUES (2, 'ROLE_ADMIN');

CREATE TABLE Dashboard
(
    Id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;

CREATE TABLE DashboardWidget
(
    Id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `Column` INT(11) NOT NULL,
    Row INT(11) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;

CREATE TABLE User
(
    Id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Enabled BIT(1) NOT NULL,
    LastPasswordResetDate DATETIME NOT NULL
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
CREATE UNIQUE INDEX User_Email_uindex ON User (Email);

CREATE TABLE Preference
(
    Id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    UserId INT(11) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Value VARCHAR(255) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL,
    CONSTRAINT Preferences_User_Id_fk FOREIGN KEY (UserId) REFERENCES User (Id)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
CREATE INDEX Preferences_User_Id_fk ON Preference (UserId);

CREATE TABLE UserAuthority
(
    UserId INT(11) NOT NULL,
    AuthorityId INT(11) NOT NULL,
    CONSTRAINT UserAuthority_User_Id_fk FOREIGN KEY (UserId) REFERENCES User (Id),
    CONSTRAINT UserAuthority_Authority_Id_fk FOREIGN KEY (AuthorityId) REFERENCES Authority (Id)
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
CREATE INDEX UserAuthority_Authority_Id_fk ON UserAuthority (AuthorityId);
CREATE INDEX UserAuthority_User_Id_fk ON UserAuthority (UserId);

CREATE TABLE Widget
(
    Id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
;
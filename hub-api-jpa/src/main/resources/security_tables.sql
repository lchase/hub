CREATE TABLE Authority
(
  Id INT(11) PRIMARY KEY NOT NULL,
  Name VARCHAR(100) NOT NULL
);
CREATE UNIQUE INDEX Authority_Id_uindex ON Authority (Id);


CREATE TABLE User
(
  Id INT(11) PRIMARY KEY NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Enabled BIT(1) NOT NULL,
  LastPasswordResetDate DATETIME NOT NULL
);
CREATE UNIQUE INDEX User_Username_uindex ON User (Username);


CREATE TABLE UserAuthority
(
  UserId INT(11) NOT NULL,
  AuthorityId INT(11) NOT NULL,
  CONSTRAINT UserAuthority_User_Id_fk FOREIGN KEY (UserId) REFERENCES User (Id),
  CONSTRAINT UserAuthority_Authority_Id_fk FOREIGN KEY (AuthorityId) REFERENCES Authority (Id)
);
CREATE INDEX UserAuthority_Authority_Id_fk ON UserAuthority (AuthorityId);

INSERT INTO User (Id, Username, Password, FirstName, LastName, Email, Enabled, LastPasswordResetDate) VALUES (1, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', 1, STR_TO_DATE('01,01,2016', '%m,%d,%Y'));
INSERT INTO User (Id, Username, Password, FirstName, LastName, Email, Enabled, LastPasswordResetDate) VALUES (2, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'enabled@user.com', 1, STR_TO_DATE('01,01,2016','%m,%d,%Y'));
INSERT INTO User (Id, Username, Password, FirstName, LastName, Email, Enabled, LastPasswordResetDate) VALUES (3, 'disabled', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'disabled@user.com', 0, STR_TO_DATE('01,01,2016','%m,%d,%Y'));

INSERT INTO Authority (Id, Name) VALUES (1, 'ROLE_USER');
INSERT INTO Authority (Id, Name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO UserAuthority (UserId, AuthorityId) VALUES (1, 1);
INSERT INTO UserAuthority (UserId, AuthorityId) VALUES (1, 2);
INSERT INTO UserAuthority (UserId, AuthorityId) VALUES (2, 1);
INSERT INTO UserAuthority (UserId, AuthorityId) VALUES (3, 1);
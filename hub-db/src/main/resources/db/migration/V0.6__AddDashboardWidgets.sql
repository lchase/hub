CREATE TABLE `dashboard_widgets` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DashboardId` INT NOT NULL,
  `WidgetType` NVARCHAR(100) NOT NULL,
  `Row` INT(11) NOT NULL,  
  `Column` INT(11) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_dashboard_widgets_dashboards_idx` (`DashboardId` ASC),
  CONSTRAINT `fk_dashboard_widgets_dashboards`
    FOREIGN KEY (`DashboardId`)
    REFERENCES `dashboards` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB
;

DROP TABLE `widgets`
;

CREATE UNIQUE INDEX `preferences_UserId_Name_uindex` ON `preferences` (`UserId`, `Name`)
;
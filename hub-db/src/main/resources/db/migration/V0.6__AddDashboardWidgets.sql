CREATE TABLE `dashboard_widgets` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DashboardId` INT NOT NULL,
  `WidgetId` INT NOT NULL,
  `Column` INT(11) NOT NULL,
  `Row` INT(11) NOT NULL,
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_dashboard_widgets_dashboards_idx` (`DashboardId` ASC),
  INDEX `fk_dashboard_widgets_widgets_idx` (`WidgetId` ASC),
  CONSTRAINT `fk_dashboard_widgets_dashboards`
    FOREIGN KEY (`DashboardId`)
    REFERENCES `dashboards` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dashboard_widgets_widgets`
    FOREIGN KEY (`WidgetId`)
    REFERENCES `widgets` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
;
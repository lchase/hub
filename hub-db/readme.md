# Flyway

## References
* You can read up on flyway [here](https://flywaydb.org/documentation/gradle/)
* Read up on the migrations [here](https://flywaydb.org/documentation/migration/sql)

## Organization
* The files are located in `src/main/resources/db/migration`
* The file name consists of:
  * **prefix**: Configurable, default: V for versioned migrations, R for repeatable migrations
  * **version**: (Versioned migrations only) Dots or underscores separate as many parts as you like
  * **separator**: Configurable, default: __ (two underscores)
  * **description**: Underscores or spaces separate the words
  * **suffix**: Configurable, default: .sql

## Migrations
* The gradle file has the settings, currently updating a database called **_hub_dos_** for testing purposes
* You have to create the **_hub_dos_** database first then this will handle the migrations.
* You can migrate just using the following (or without -i to skip info)
```Shell
gradle flywayMigrate -i
```


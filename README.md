# hub
Hub for dev ops dashboard and health

# Prerequisites
- JDK >= 8
- Gradle
- npm

# Setup instructions
Follow the README instructions in each subfolder at the following order of execution:
* Under hub-db, run: gradle flywayClean flywayMigrate - to reset the db and put basic data in for user accounts
* Under hub-api-jpa run: gradle bootRun - to spin up the api server (or gradlew for Linux)
* Under hub-ui run: npm install && npm start - to spin up the web site
and you're ready to go in development environment.
Navigate to http://localhost:4001 and log in with a@a.com / c

# About
* Hub API implementation using Spring Boot / Spring Security / Katharsis (JSON-API) / JPA
* Authentication uses JWT

# Instructions
* "gradlew.bat bootRun" - downloads dependencies, builds, and starts the API server
* Database configuration is currently hardcoded: MySQL:3306, database: "hub", root/blue.  You may need to apply the
SQL script under src/main/resources/security_tables.sql, this will create "User", "Authority" and "UserAuthority" tables
* To generate JWT token: POST to http://localhost:8080/auth with a body content like {"username":"user","password":"password"}
* Default users: admin/admin, user/password
* Include JWT token in "Authorization" header in all subsequent requests
* Some API endpoints
    * /resourcesInfo - returns list of all registered JSON-API endpoints on the server
    * /user - returns info about current logged in user
    * All JSON-API endpoints are prefixed with /api/
        * /api/users - returns all users from User table



# TODO
* Automatically create/register Katharsis repositories based on JPA model definitions in specific packages
* Create file log configuration with logback
* Consolidate application.properties and application.yml files
* Consolidate "User" and "Users" tables ("Users" is used by existing node API)
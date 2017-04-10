# General
* "npm install" - installs all dependencies including webpack
* "npm start" - Builds the UI module and starts the webpack development server,
which also monitors changes to source files and auto-deploys them.
* Navigate to "http://localhost:4001/". NOTE: make sure hub-api-jpa
is running before you do this, otherwise it won't work.
* "npm test" - runs unit tests


# Todo
* Implement validation logic for create dashboard
* Wire up backend calls for dashboard (api needed as well)
* Sort out dashboard grid and how that would be stored then implement that
* Figure out how users pick shared dashboards or share private dashboards and view multiple dashboards
* Optimize webpack build to only build vendor lib when dependencies change.  Also try to optimize size of build

# Misc
* ctrl-h toggles on/off dock monitor on the right.

# Project Structure
* app - The "shell" module containing the top level component, root reducer, etc.  NOTE: no other modules should have a
dependency on this module!
* auth - Functionality related to authentication/authorization and users
* common - Module containing functionality common to all modules (API invocation actions, general error handling, etc.)
NOTE: This module should not depend on any other modules in this project!
* components - TODO: needs to be cleaned up and components moved to their own modules
* dashboard - Functionality related to dashboards
* ping - an example component to test/demo redux-observable
* preference - Functionality related to user preferences
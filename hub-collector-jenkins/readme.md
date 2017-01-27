# Todo
* The workflow_step_runs have a foreign key to the workflow_step but should also
have one to workflow_step_run that they were a part of.  The table doesn't have a
WorkflowStepRunId column

# Running the app

Pre-requisites:
* VPN to access jenkins
* The latest database schema
* The hub-api-jpa project running
* A valid account for the config.js which is currently using **user@user.com / c**

You can run the app using the following command.

```
npm start
```

# Reference

The api we need to get to ultimately is behind a url like this...

For ex: http://atljenkinsstaging:8080/job/FTW/job/WFM/job/WFM-Workflow/124/wfapi/describe

I think that is a list json description but doesn't identify the stages which may not be discoverable unless using the runs api http://atljenkinsstaging:8080/job/FTW/job/WFM/job/WFM-Workflow/wfapi/runs or maybe just by the old api http://atljenkinsstaging:8080/job/FTW/job/WFM/job/WFM-Workflow/api/json?pretty

If you want to have a quick win on getting pipeline status from REST API: https://github.com/jenkinsci/pipeline-stage-view-plugin/tree/master/rest-api



# Issues
* Looking up prior workflow step runs isn't working in the rest api.  A url like this
```http://localhost:8080/api/workflowStepRun/?filter[workflowStepId]=474&filter[start]=2015-01-01```
fails with 404 while this one
```http://localhost:8080/api/workflowStepRun/?filter[workflowStepId]=474```
or even this one
```http://localhost:8080/api/workflowStepRun/?filter[workflowStepId]=474&filter[id]=1```
just return the empty data payload.  I don't know if it is related to the start being a date field or something.

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



"npm install" - installs all dependencies including webpack
"webpack -d --watch" - builds the webpack module and starts a watcher process to auto-build on new changes
"npm start" - invokes "nodemon --debug=5001 ./build/server.js" - this will start the node process with a debug listener on port 5001, loading the webpack module built in the previous step
module.exports = {
  jenkins: {
    host: 'http://atljenkinsstaging.lab.local:8080',
    credentials: {
      username: 'lchase',
      token: 'c0e4276e51310eb2d50018e34a196f6a'
    }
  },
  hub: {
    apiHost: 'http://localhost:8080',
    credentials: {
      username: 'user@user.com',
      password: 'c'
    }
  },
  uris: {
    /*dynamic: true, In theory we would do discovery but Jenkin's api is ugly, folders are jobs too */
    explicit: [
      { uri: 'http://lchase:c0e4276e51310eb2d50018e34a196f6a@atljenkinsstaging.lab.local:8080/job/FTW/job/WFM/job/WFM-Workflow/' }
    ]
  }
}
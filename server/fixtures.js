Files.remove({})
Meteor.users.remove({})

Meteor.startup(function () {
  if (!Meteor.users.findOne({ username: 'demo'})) {
    Accounts.createUser({
      username: 'demo',
      password: 'demo'
    })
  }
})

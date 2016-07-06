// we don't need this really

Meteor.startup(function () {
  Meteor.autorun(function () {
    if (!Meteor.userId())
      Cookies.remove('x-auth-token')
    else
      Cookies.set('x-auth-token', Accounts._storedLoginToken())
  })
})

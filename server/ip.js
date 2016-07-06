Meteor.methods({
  getMobileRootUrl () {
    return process.env.MOBILE_ROOT_URL
  }
})

Template.picker.events({
  'change .picker input': function (e, t) {
    e.preventDefault()
  },
  'click #removeAllFiles': function () {
    Meteor.call('removeAllFiles')
  }
})

// attach file picker event when picker is ready

Template.picker.onRendered(function () {

  Files.resumable.assignBrowse(this.find('.picker input'))

  // when your want custom header, this is important for cordova,
  // you can send x-auth-token here to get userId in Files.allow({ write: function (userId) })
  // if you don't do this, you can't get userId

  Files.resumable.opts.headers = {
    'x-auth-token': Accounts._storedLoginToken(),
    'x-custom-header': 123
  }

  // Files.resumable.withCredentials = true

  Files.resumable.on('fileAdded', function (file) {

    Files.insert({
      createdAt: new Date(),
      _id: file.uniqueIdentifier,
      filename: file.fileName,
      contentType: file.file.type
    }, function (err, _id) {
      Files.resumable.upload()
    })
  })

})

// get your files by template helper

Template.fileList.onCreated(function () {
  Meteor.call('getMobileRootUrl', (e, r) => {
    Session.set('mobileRootUrl', r)
  })
})

//

Template.fileList.helpers({
  files() {
    return Files.find({}, {sort: { createdAt: 1 }})
  },
  mobileRootUrl() {
    return Session.get('mobileRootUrl')
  }
})

Template.login.events({
  'submit form': function (e, t) {
    e.preventDefault()
    Meteor.loginWithPassword('demo', 'demo')
  }
})

Files = new FileCollection('files', {
  resumable: true,
  http: [{
    method: 'get',
    path: '/:md5',
    lookup(params, query) {
      return {
        md5: params.md5
      }
    }
  }, {
    method: 'head',
    path: '/_resumable',
    lookup(params, query) {
      return {}
    },
    handler(req, res, next) {
      console.log('head', req.headers, '\n\n\n\n\n')
      console.log('head', req.cookies, '\n\n\n\n\n')
      if (req.headers && req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        res.setHeader('Access-Control-Allow-Credentials', true)
      }
      next()
      return
    }
  }, {
    method: 'post',
    path: '/_resumable',
    lookup(params, query) {
      return {}
    },
    handler(req, res, next) {
      console.log('post', req.headers, '\n\n\n\n\n')
      console.log('post', req.cookies, '\n\n\n\n\n')
      if (req.headers && req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        res.setHeader('Access-Control-Allow-Credentials', true)
      }
      next()
      return
    }
  }, {
    method: 'options',
    path: '/_resumable',
    lookup(params, query) {
      return {}
    },
    handler(req, res) {
      console.log('options', req.headers, '\n\n\n\n\n')
      console.log('options', req.cookies, '\n\n\n\n\n')
      if (req.headers && req.headers.origin) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': req.headers.origin,
          'Access-Control-Allow-Credentials': true,
          // you must allow your custom header here
          'Access-Control-Allow-Headers': 'x-auth-token, user-agent, x-custom-header',
          'Access-Control-Allow-Methods': 'POST, HEAD'
        })
        res.end()
        return
      }
    }
  }]

})

if (Meteor.isServer) {
  Files.allow({
    insert(userId) {
      // console.log(userId)
      return true
    },
    read() {
      return true
    },
    write(userId, doc) {
      // we can get current user id
      console.log(userId, doc)
      return true
    },
    remove() {
      return true
    }
  })
}

Meteor.methods({
  removeAllFiles() {
    Files.remove({})
  }
})

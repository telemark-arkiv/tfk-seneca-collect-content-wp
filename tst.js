'use strict'

const seneca = require('seneca')()
const content = require('./index')
const options = {
  type: 'news',
  channelId: 'news',
  feedHostUrl: 'http://s19492.p388.sites.pressdns.com/wp-json/wp/v2/posts',
  verbose: true
}

seneca.add('role: info, info: content-collected', (args, callback) => {
  console.log(args.data)
  callback(null, {ok: true})
})

seneca.use(content, options)

seneca.act('cmd: collect-info, type: user', {user: 'gasg', roles: ['alle']})

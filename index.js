'use strict'

const Wreck = require('wreck')
const querystring = require('querystring')
const makeUnique = require('tfk-unique-array')
const pkg = require('./package.json')
const convertResult = require('./lib/convert-result')

module.exports = function collectContent (options) {
  const seneca = this
  const tag = options.tag || 'tfk-seneca-collect-content'
  const logTime = require('./lib/log-time')
  const verbose = options.verbose || false

  seneca.add('cmd: collect-info, type: user', getContent)

  function getContent (args, callback) {
    callback(null, {ok: true})

    const seneca = this
    const user = args.user
    var result = {
      system: options.system || pkg.name,
      type: options.type,
      user: user,
      data: []
    }
    const tags = args.roles.join('+')
    const query = {
      'filter[category]': options.channelId,
      'filter[tag]': tags
    }

    const url = `${options.feedHostUrl}?${querystring.stringify(query)}`

    if (verbose) {
      console.log(`${tag} - ${logTime()}: collects content - ${user}`)
    }

    console.log(url)
    Wreck.get(url, {json: true}, (error, response, payload) => {
      if (error) {
        if (verbose) {
          console.log(`${tag} - ${logTime()}: error collecting content - ${user} - ${JSON.stringify(error)}`)
        }
        console.error(error)
      } else {
        result.data = makeUnique(convertResult(payload))
        if (verbose) {
          console.log(`${tag} - ${logTime()}: got content - ${user} - found ${result.data.length}`)
        }
        seneca.act('role: info, info: content-collected', {data: result})
      }
    })
  }

  return tag
}

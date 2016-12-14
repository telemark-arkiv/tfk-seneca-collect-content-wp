[![Build Status](https://travis-ci.org/telemark/tfk-seneca-collect-content-wp.svg?branch=master)](https://travis-ci.org/telemark/tfk-seneca-collect-content-wp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-seneca-collect-content-wp
Collect content from wp sites with rest-api plug-in enabled.

## Messages handled

### ```cmd: collect-info, type: user```

Collects content for a user and/or a user's roles

```JavaScript
seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

```bash
$ curl -d '{"cmd":"collect-info", "type": "user", "user":"gasg", "roles": ["alle"]}' -v http://localhost:8000/act
```

## Messages emitted

### ```role: info, info: content-collected```

Contains collected info for user/role wrapped in the data property

```JavaScript
{
    system: 'systemname',
    type: 'news',
    user: user,
    data: [] //collected info
  }
```

## Example

```JavaScript
'use strict'

const seneca = require('seneca')()
const content = require('tfk-seneca-collect-content-wp')
const options = {
  type: 'news',
  channelId: 'news',
  feedHostUrl: 'https://info.portalen.no/wp-json/wp/v2/posts',
  verbose: false // Turns logging on/off
}

seneca.add('role: info, info: content-collected', (args, callback) => {
  console.log(args.data)
  callback()
})

seneca.use(content, options)

seneca.act('cmd: collect-info, type: user', {user: 'gasg', roles: ['alle', 'administrasjonen']})
```

## License
[MIT](LICENSE)

'use strict'

const striptags = require('striptags')

function repack (item) {
  const template = {
    title: striptags(item.title.rendered || ''),
    summary: item.excerpt.rendered || '',
    description: item.content.rendered || '',
    url: item.link,
    jsonUrl: item._links.self[0].href
  }

  return template
}

module.exports = (data) => {
  return data.map(repack)
}

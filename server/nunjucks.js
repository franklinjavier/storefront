'use strict'

const nunjucks = require('nunjucks')
const debug = require('debug')('storefront:nunjucks')

const APP_ROOT = require('path').join(__dirname + '/../')

const FileLoaderInstance = new nunjucks.FileSystemLoader(APP_ROOT + '/views')
const env = new nunjucks.Environment(FileLoaderInstance, {
  trimBlocks: true,
  lstripBlocks: true
})

module.exports = env

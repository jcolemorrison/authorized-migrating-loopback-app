'use strict'

const utils = require('./utils')

module.exports = function timestampMixin (Model) {
  Model.defineProperty('createdAt', {type: Date, default: '$now'})
  Model.defineProperty('updatedAt', {type: Date, default: '$now'})
  Model.observe('before save', utils.updateTimestamps)
}

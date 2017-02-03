'use strict'

exports.updateTimestamps = function updateTimestamps (context, next) {
  if (context.instance) {
    context.instance.updatedAt = new Date()
  } else {
    context.data.updatedAt = new Date()
  }
  next()
}

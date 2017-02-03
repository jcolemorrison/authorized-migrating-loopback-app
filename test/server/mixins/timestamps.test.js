'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const mixin = require('../../../server/mixins/timestamps.js')
const utils = require('../../../server/mixins/utils')

describe('Timestamps Mixin', () => {
  let Model, updateTimestamps

  beforeEach(() => {
    Model = {
      defineProperty: sinon.stub(),
      observe: sinon.stub(),
    }
    updateTimestamps = sinon.stub(utils, 'updateTimestamps')
  })

  afterEach(() => {
    updateTimestamps.restore()
  })

  it('should define a createdAt property', () => {
    mixin(Model)
    expect(Model.defineProperty.calledWith('createdAt', {type: Date, default: '$now'})).to.be.true
  })
  it('should define an updatedAt property', () => {
    mixin(Model)
    expect(Model.defineProperty.calledWith('updatedAt', {type: Date, default: '$now'})).to.be.true
  })
  it('should call to #utils.updateTimetamps on a `before save` event', () => {
    mixin(Model)
    expect(Model.observe.calledWith('before save', updateTimestamps)).to.be.true
    updateTimestamps.restore()
  })
})

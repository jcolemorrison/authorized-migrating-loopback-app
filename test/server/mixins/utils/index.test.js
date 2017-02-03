'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const utils = require('../../../../server/mixins/utils')

describe('Utility Functions', function () {
  describe('#updateTimestamps()', function () {
    it('should update `updatedAt` on an instance', () => {
      const context = {
        instance: {},
      }
      const next = sinon.stub()
      utils.updateTimestamps(context, next)
      expect(context.instance.updatedAt).to.be.an.instanceof(Date)
      expect(next.called).to.be.true
    })
    it('should update `updatedAt` on a request', () => {
      const context = {
        data: {},
      }
      const next = sinon.stub()
      utils.updateTimestamps(context, next)
      expect(context.data.updatedAt).to.be.an.instanceof(Date)
      expect(next.called).to.be.true
    })
  })
})

const assert = require('assert')
const { When, Then } = require('@cucumber/cucumber')
const Template = require('../../src')

When('the application is launched', function () {
  this.displayName = Template.name
})

Then('i should see the text {string}', function (expectedResponse) {
  assert.equal(this.displayName, expectedResponse)
})

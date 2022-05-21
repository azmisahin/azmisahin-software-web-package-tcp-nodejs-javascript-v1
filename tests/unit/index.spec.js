// assert library
const assert = require('assert').strict

// Target condination.
const target = 'template'
const Template = require('../../src')

/**
 * Application initiation tests.
 */
describe(`${target}`, function () {
  // Main application carrier
  let template

  /**
   * Instance initalize
   */
  beforeEach(function () {
    // template instance
  })

  /**
   * Should create an instance of Module.
   */
  it(`${target}.constructor`, function () {
    // module instance
    template = new Template()

    // mock
    let _parameters = Template

    // parameters
    let expected = _parameters

    // operation
    let result = template

    // result
    let actual = result

    // condination
    assert(actual instanceof expected)
  })
})

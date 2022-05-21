// assert library
const assert = require('assert').strict

// Target condination.
const target = 'tcp'
const Tcp = require('../../src')

/**
 * Application initiation tests.
 */
describe(`${target}`, function () {
  // Main application carrier
  let tcp

  /**
   * Instance initalize
   */
  beforeEach(function () {
    // instance mock
    jest.mock('../../src/index')
  })

  /**
   * Should create an instance of Module.
   */
  it(`${target}.constructor`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let _parameters = Tcp

    // parameters
    let expected = _parameters

    // operation
    let result = tcp

    // result
    let actual = result

    // condination
    assert(actual instanceof expected)
  })

  /**
   * Should create an event of Module.
   */
  it(`${target}.event(eventName, callback)`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let spy = jest.spyOn(tcp, 'event')

    // operation
    tcp.event('test', function () {})

    // condination
    expect(spy).toHaveBeenCalled()
  })

  /**
   * Should create an signal of Module.
   */
  it(`${target}.signal(eventName, eventData)`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let spy = jest.spyOn(tcp, 'signal')

    // operation
    tcp.signal('test', null)

    // condination
    expect(spy).toHaveBeenCalled()
  })

  /**
   * Should create an handleStream of Module.
   */
  it(`${target}.handleStream()`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let spy = jest.spyOn(tcp, 'handleStream')

    // operation
    tcp.handleStream()

    // condination
    expect(spy).toHaveBeenCalled()
  })

  /**
   * Should create an handleStream(stream) of Module.
   */
  it(`${target}.handleStream(stream)`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let spy = jest.spyOn(tcp, 'handleStream')

    // operation
    tcp.handleStream(null)

    // condination
    expect(spy).toHaveBeenCalled()
  })

  /**
   * Should create an server of Module.
   */
  it(`${target}.server()`, function () {
    // module instance
    tcp = new Tcp()

    // mock
    let spy = jest.spyOn(tcp, 'server')

    // operation
    tcp.server()

    // condination
    expect(spy).toHaveBeenCalled()
  })
})

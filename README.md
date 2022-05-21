# Introduction
A Tcp server can be a TCP or an IPC server depending on what it listens to.

## Example
```js
const TraceManager = require('trace-manager')

// package define
const Tcp = require('package-tcp-javascript')

// module instance
var tcp = new Tcp()

// trace manager
var tracking = new TraceManager()

// new tcp server
var server = tcp.server()

/**
 * tcp warning
 * @param {event} event event.chunk, event.stream, event.error
 */
tcp.event('tcp-warn', () => {
  // Tracking
  tracking.warn(`${process.pid}\ttcp-warning\t X\t`)
})

/**
 * tcp stream
 * @param {event} event event.chunk, event.stream
 */
tcp.event('tcp-stream', (event) => {
  tracking.info(`${process.pid}\ttcp-stream\t⚡️\t`, {
    from: event.stream.remoteAddress,
    data: event.chunk,
  })
})

/**
 * tcp response
 * @param {event} event event.chunk, event.stream
 */
tcp.event('tcp-response', (event) => {
  tracking.info(`${process.pid}\ttcp-response\t⏪\t`, {
    from: event.stream.remoteAddress,
    data: event.chunk,
  })
})

// listener
server.listen(parseInt(process.env.TCP_PORT), () => {
  // Tracking [ info ]
  tracking['info'](`${process.pid}\ttcp-server\t✅\t`, parseInt(process.env.TCP_PORT))
})
```

# Getting Started
TO DO: Things to do when getting started on this project.
- [Documentation](docs/README.md).

# Build and Test
TODO: Will apply your code and project building standards to templates.
* The tests will be applied as in the template projects.
* Development and operation will be planned as test/slot/production.

# Contribute
TODO : The best method of making a contribution will be to comply with the following items.
* Work with algorithms and flowcharts to solve problems.
* Make pull requests to version control systems.
* Stick to Architecture and Design Patterns apps.
* Take care to develop applications with Domain Based Design / Test-oriented development approaches.
* Stick to the architectural patterns used in abstraction software like Model-View-Controller.
- Be consistent in executing maintainable practices with Object Oriented Programming (abstraction, encapsulation, inheritance and polymorphism...) techniques.
* Use behavior-oriented development tools effectively.
* Make it a habit to use Integration testing / Unit Testing / Functional Testing / Automation Tests.
* Be persistent in applying metrics that describe how well the source code has been tested. [ have something to show at meetings: ) ]
* Send your code with traditional commit messages, make your code understandable with static code analysis tools, "code documentation" tools.
* Build event-driven, scalable service applications with serverless application development platforms.
* Follow the steps to improve threading techniques like in services or mobile apps. 

# While starting

In the project; principles and architectural examples of development, code submission, consistent coding styles and development in team environment have been implemented.

- Welcome to us, to contribute See [How to Provide Storey](CONTRIBUTING.md)
- Review the Participant Agreement [Code of Conduct](CODE_OF_CONDUCT.md).

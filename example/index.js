/**
 * Example application
 */
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

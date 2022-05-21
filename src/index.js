'use strict'

/**
 * @file
 * package-tcp
 */

/**
 * Tracking Manager
 * Module dependencies
 * @private
 */
const TraceManager = require('trace-manager')

/**
 * The cluster module allows easy creation of child processes that all share server ports.
 * @private
 */
const cluster = require('cluster')

/**
 * Event Emiter
 * @private
 */
const EventEmitter = require('events')

/**
 * Domains provide a way to handle multiple different IO operations as a single group.
 * If any of the event emitters or callbacks registered to a domain emit an 'error' event, or throw an error,
 * then the domain object will be notified, rather than losing the context of the error in the process.on('uncaughtException') handler,
 * or causing the program to exit immediately with an error code.
 * @private
 */
const domain = require('domain')

//////////////////////////////////////////////////

/**
 * Tracking instance
 * @private
 */
const tracking = new TraceManager()

//////////////////////////////////////////////////

/**
 * Start a server listening for connections.
 * A Tcp server can be a TCP or an IPC server depending on what it listens to.
 *
 * @example
 *
 *  // module instance
 *  tcp = new Tcp()
 *
 *  tcp
 *    .server()
 *    .listen(50001)
 *
 * @class
 * Tcp Server
 */
class Tcp extends EventEmitter {
  /**
   * TCP
   */
  constructor() {
    // Base
    super()
  }

  /**
   * Event
   * @param {string} eventName Event Name
   * @param {function} callback callback function
   */
  event(eventName, callback) {
    // internal event callback
    this.on(eventName, callback)
  }

  /**
   * Signal
   * @param {string} eventName Event Name
   * @param {any} eventData callback data
   */
  signal(eventName, eventData) {
    // internal event
    this.emit(eventName, eventData)
  }

  /**
   * Application logic here.
   * @param {stream} stream
   */
  handleStream(stream) {
    // selft
    let self = this

    // stream
    if (stream) {
      // data chuck
      let chunk

      // stream
      stream
        // error <Error> Optional, an error to emit with 'error' event.
        .on('error', (error) => {
          switch (error.code) {
            case 'ECONNRESET':
              // Tracking
              tracking.warn(`${process.pid}\ttcp-terminated\t X\t`, {
                c: chunk === undefined ? '-' : chunk.toString('utf8'),
                a: stream.remoteAddress || '-',
                s: chunk === undefined ? '-' : chunk.toString('utf8'),
              })
              break

            case 'EPIPE':
              // Tracking
              tracking.error(
                `${process.pid}\ttcp-request-error\t`,
                `this stream has been ended by the ${stream.remoteAddress}`
              )
              break
            default:
              // Tracking
              tracking.error(`${process.pid}\ttcp-request-error\t`, error)
              break
          }
          // stream error callback
          self.signal('tcp-warn', { stream, chunk, error })
        })
        // The data will be lost if there is no listener when a Socket emits a 'data' event.
        .on('data', (data) => {
          // save temporary
          chunk = data

          // stream callback
          self.signal('tcp-stream', { stream, chunk })
        })
        // Emitted when the other end of the socket sends a FIN packet, thus ending the readable side of the socket.
        .on('end', () => {
          // tcp stream callback
          self.signal('tcp-response', { stream, chunk })
        })
    }
  }

  /**
   * Tcp Server
   * @returns Net
   */
  server() {
    /**
     * Creates a new TCP server
     */
    const server = require('net').createServer((stream) => {
      // The Domain class encapsulates the functionality of routing errors and uncaught exceptions to the active Domain object
      const d = domain.create()

      // An error occurred somewhere. If we throw it now, it will crash the program
      // with the normal line number and stack message
      d.on('error', (error) => {
        // the normal line number and stack message
        tracking.error(`${process.pid}\thttp-error\t`, `${error.stack.split('\n').slice(0, 1)}`)
        tracking.debug(`${process.pid}\thttp-error\t`, `${error.stack}`)

        // By definition, something unexpected occurred,
        try {
          // Make sure we close down within 10 seconds
          // :)
          const terminator = setTimeout(
            () => {
              // The 'exit' event is emitted when the Node.js process is about to exit as a result of either:
              process.exit(1)
            },

            // cooling time.
            10000
          )

          // .unref() has been called before.
          terminator.unref()

          // Stop taking new requests.
          server.close()

          // 'disconnect' in the cluster master, and then it will fork
          // a new worker.
          cluster.worker.disconnect()

          // Try to send an error to the request that triggered the problem
          stream.end(`${process.pid}\tdomain-error\t`)
        } catch (exception) {
          // Oh well, not much we can do at this point.
          tracking.trace(`${process.pid}\tdomain-exception\t`, exception.stack)
        }
      })

      // Because stream were created before this domain existed,
      // we need to explicitly add them.
      d.add(stream)

      // Now run the handler function in the domain.
      d.run(() => {
        // Application logic
        this.handleStream(stream)
      })
    })

    //
    return server
  }
}

/**
 * Tcp server listener
 * @module tcp
 */
module.exports = Tcp

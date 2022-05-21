/**
 * Example application
 */

// package define
const Template = require('../src')

// module instance
var template = new Template()

// a normal status code is returned when the package runs successfully.
process.exit(template instanceof Template == true ? 0 : 1)

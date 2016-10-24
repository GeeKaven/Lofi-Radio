require("babel-runtime/core-js/promise").default = require("bluebird");
global.Promise = require("bluebird");
import app from './app'
export default app

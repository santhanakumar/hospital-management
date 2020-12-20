const settings = require('./settings');
const appointments = require('./appointments');

module.exports = [...settings, ...appointments];

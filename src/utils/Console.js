require('colors');
const fs = require('fs');

const LOG_FILE = './terminal.log';

function log(level, color, label, ...message) {
    const time = new Date().toLocaleTimeString();
    const formatted = `[${time}] ${label} ${message.join(' ')}`;
    console.log(formatted);
    fs.appendFileSync(LOG_FILE, formatted + '\n', 'utf-8');
}

const info = (...message) => log('info', 'blue', '[Info]'.blue, ...message);
const success = (...message) => log('info', 'green', '[OK]'.green, ...message);
const error = (...message) => log('error', 'red', '[Error]'.red, ...message);
const warn = (...message) => log('warn', 'yellow', '[Warning]'.yellow, ...message);

module.exports = { info, success, error, warn }

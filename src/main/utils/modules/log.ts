import log from 'electron-log'
log.transports.file.level = 'info'
log.transports.console.level = 'debug'

log.transports.file.maxSize = 5 * 1024 * 1024 // 5MB
export default log

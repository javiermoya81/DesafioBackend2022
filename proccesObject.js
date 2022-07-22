
const argumentoEntrada = process.argv
const nombrePlataforma = process.platform
const versionNode = process.version
const memoReserv = process.memoryUsage.rss()
const pathEjecucion = process.execPath
const processId = process.pid
const proyectFolder = process.mainModule.path

console.log(proyectFolder);
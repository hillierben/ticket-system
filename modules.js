// requring a file actually runs the imported file
const mod = require('./people')

console.log(mod.people)
console.log(mod.ages)

const os = require('os')
console.log(os.platform(), os.hostname())
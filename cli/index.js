const args = process.argv.slice(2)
const handleInit = require('./init')
const handleCreate = require('./create')

switch (args[0]) {
    case 'init':
        handleInit()
        break
    case 'create':
        handleCreate()
        break
}

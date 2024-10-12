const args = process.argv.slice(2)
const handleInit = require('./init')
const handleAdd = require('./add')

switch (args[0]) {
    case 'init':
        handleInit()
        break
    case 'add':
        if (args[1]) {
            handleAdd(args[1])
        } else {
            console.log('Error: Missing file name for add command')
        }
        break
}

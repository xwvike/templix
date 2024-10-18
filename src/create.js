const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const { prompt } = inquirer.default

function handleCreate() {
    prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new page:',
            default: 'NewFile',
        },
        {
            type: 'select',
            name: 'pageType',
            message: 'What do you want to create?',
            choices: ['blank'],
            default: 'blank',
        },
    ]).then((answers) => {
        const { name, pageType } = answers
        const pagePath = path.join(process.cwd(), 'src', 'views')
        const filePath = path.join(pagePath, `${name}.vue`)
        const templatePath = path.join(__dirname, '..', 'pageTemplates', pageType+'.vue')
        const template = fs.readFileSync(templatePath, 'utf8')
        fs.writeFileSync(filePath, template)
    })
}

module.exports = handleCreate

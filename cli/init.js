const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const { prompt } = inquirer.default
function handleInit() {
    console.log('Initializing project...')
    prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter your project name:',
            default: 'my-app',
        },
        {
            type: 'confirm',
            name: 'useGit',
            message: 'Initialize a git repository?',
            default: false,
        },
    ]).then((answers) => {
        const { projectName, useGit } = answers
        const projectPath = path.join(process.cwd(), projectName)

        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath)
        }

        fs.mkdirSync(projectPath, { recursive: true })

        const templatePath = path.join(__dirname, '..', 'templates', 'primevue')
        const exclude = ['node_modules', '.git', 'pnpm-lock.yaml']

        fse.copy(templatePath, projectPath, {
            filter: (src) => {
                const baseName = path.basename(src)
                return !exclude.includes(baseName)
            },
        })
            .then(() => {
                const packageJsonPath = path.join(projectPath, 'package.json')

                if (fs.existsSync(packageJsonPath)) {
                    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

                    packageJson.name = projectName

                    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
                }
                if (useGit) {
                    require('child_process').execSync('git init', {
                        cwd: projectPath,
                    })
                    console.log('Initialized a git repository.')
                }
            })
            .catch((err) => {
                console.error('Error init:', err)
            })
    })
}

module.exports = handleInit

const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const prettier = require('prettier')

class CodeTransformer {
    constructor(options = {}) {
        this.options = {
            sourcePath: '',
            targetPath: '',
            rules: [],
            parserOptions: {
                sourceType: 'module',
                plugins: ['typescript', 'jsx'],
            },
            ...options,
        }

        this.transforms = new Map()
    }
    registerTransform(name, transform) {
        this.transforms.set(name, transform)
    }
    applyTransforms(ast) {
        for (const [name, transform] of this.transforms) {
            traverse(ast, transform(t))
        }
    }

    async transform() {
        try {
            const source = this.readFile(this.options.sourcePath)
            const ast = parser.parse(source, this.options.parserOptions)

            this.applyTransforms(ast)

            const output = generate(
                ast,
                {
                    retainLines: true,
                    compact: false,
                },
                source
            )

            const formattedCode = await this.formatCode(output.code)

            this.writeFile(this.options.targetPath, formattedCode)
        } catch (error) {
            console.error('Error during transformation:', error)
            throw error
        }
    }

    async formatCode(code) {
        try {
            const prettierConfig = await prettier.resolveConfig(this.options.targetPath)

            const options = {
                ...prettierConfig,
                ...this.options.prettierOptions,
                filepath: this.options.targetPath,
            }

            return prettier.format(code, options)
        } catch (error) {
            console.error('Error formatting code:', error)
            return code
        }
    }

    readFile(filePath) {
        return fs.readFileSync(path.resolve(filePath), 'utf-8')
    }

    writeFile(filePath, content) {
        const dir = path.dirname(filePath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(path.resolve(filePath), content, 'utf-8')
    }
}

module.exports = CodeTransformer

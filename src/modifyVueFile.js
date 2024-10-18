const fs = require('fs')
const path = require('path')

/**
 * 根据条件删除 Vue 文件中的指定 import 语句和对应的组件标签
 * @param {string} filePath - 需要修改的文件路径
 * @param {boolean} shouldRemoveComponent - 是否删除指定的 import 和组件
 * @param {string} importName - 要删除的 import 名称 (如 'GlobalLoading')
 * @param {string} componentName - 要删除的组件名称 (如 'GlobalLoading')
 */
function modifyVueFile(filePath, shouldRemoveComponent, importName, componentName) {
    let fileContent = fs.readFileSync(filePath, 'utf8')

    if (shouldRemoveComponent) {
        if (importName) {
            const importRegex = new RegExp(`import ${importName} from '.*';?\\n?`)
            fileContent = fileContent.replace(importRegex, '')
        }
        if (componentName) {
            const componentRegex = new RegExp(`<${componentName}\\s*\\/?>`, 'g')
            fileContent = fileContent.replace(componentRegex, '')
        }
    }

    // 将修改后的内容写回文件
    fs.writeFileSync(filePath, fileContent, 'utf8')
}

module.exports.modifyVueFile = modifyVueFile

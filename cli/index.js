#!/usr/bin/env node

const args = process.argv.slice(2)
const handleInit = require('../src/init')
const handleCreate = require('../src/create')

switch (args[0]) {
    case 'init':
        handleInit()
        break
    case 'create':
        handleCreate()
        break
}

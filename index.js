#!/usr/bin/env node
const { program } = require('commander')
const createCommands = require('./lib/core/create')
program.version(require('./package.json').version)
// 增加自己的可选参数
program.option('-d --dest <dest>', 'a destination folder')
createCommands()
program.parse(process.argv)
// console.log(program.opts().dest)
console.log(process.argv)

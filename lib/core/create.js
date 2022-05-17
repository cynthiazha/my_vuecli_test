const { program } = require('commander')
const { createProjectAction, addPage } = require('./action')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a reposity from git')
    // .action((project, ...args) => {
    //   console.log(project)
    // })
    .action(createProjectAction)

  // 创建页面
  program
    .command('addPage <name>')
    .description('add vue page, 例如cyn addPage about [-d dest]')
    .action((name) => {
      addPage(name, program.opts().dest || `src/views/${name.toLowerCase()}`)
    })
}
module.exports = createCommands

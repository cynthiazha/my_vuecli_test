const { promisify } = require('util')

const downloadRepo = require('download-git-repo')
const open = require('open')
const path = require('path')

const { spawnCommander } = require('../utils/terminal')
const { ejsCompile, mkdirSync, writeFile } = require('../utils/file')

const vueRepo = 'direct:https://github.com/cynthiazha/vue_temp.git'

const createProjectAction = async (project) => {
  console.log('helps you create your project,please wait....')
  // clone项目从目标仓库
  const promiseDownloadRepo = promisify(downloadRepo)
  await promiseDownloadRepo(vueRepo, project, { clone: true, checkout: 'main' })

  // 执行终端命令npm install
  const npm = process.platform === 'win32' ? 'npm.cwd' : 'npm'
  await spawnCommander(npm, ['install'], { cwd: `./${project}` })

  // 打开浏览器
  open('http://localhost:8080')

  // 运行项目
  await spawnCommander(npm, ['run', 'serve'], { cwd: `./${project}` })
}
const handleEjsToFile = async (name, dest, template, filename) => {
  // 获取模块引擎路径
  const templatePath = path.resolve(__dirname, template)
  const content = await ejsCompile(templatePath, {
    name,
    lowerName: name.toLowerCase()
  })

  //判断文件是否存在。不存在就创建
  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, content)
}
const addPage = (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
  handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}
module.exports = {
  createProjectAction,
  addPage
}

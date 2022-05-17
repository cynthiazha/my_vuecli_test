const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const ejsCompile = (templatePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    // data是传递给ejs模板的数据
    ejs.renderFile(templatePath, { data }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve(str)
    })
  })
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    console.error('the file already exist!!!!')
    return
  }
  return fs.promises.writeFile(path, content)
}

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在，判断父文件夹是否存在
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父文件夹，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync
}

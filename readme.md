# 说明文档
## `cyn`: vuecli创建工具的实现练习

安装：
```shell
npm install cyn -g
```
### 创建项目

```shell
cyn create project_name
```

### 实现原理
* 通过commander.js这个库创建自定义命令create
* 通过download-git-repo这个库对vue_temp这个库进行clone、自动拉取项目模板，安装项目依赖，打开浏览器 `http://localhost:8080/`、自动启动项目


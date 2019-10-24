'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const fs = require('fs')
const moment = require('moment')

// Begin to generate markdown map tree file: markdown/index.js
const markdownScanPath = config.build.root.replace('config', '') + 'markdown'

function isMarkdownFile (myPath) {
  const suffix = path.extname(myPath)
  return suffix === '.MD' || suffix === '.md'
}

function getFileName (myPath) {
  const fileName = path.basename(myPath).split('.')[0]
  let work = fileName.replace(/-/g, " ")
  return {
    name: work.substring(11, work.length),
    dateTime: work.substring(0, 10).replace(/ /g, "/")
  }
}

function getUrl (myPath) {
  return myPath.replace(markdownScanPath, '').replace(/\\/g, "/")
}

function getFileInfo (myPath) {
  return {
    isFileAdded: isMarkdownFile(myPath),
    name: getFileName(myPath).name,
    url: getUrl(myPath),
    dateTime: getFileName(myPath).dateTime
  }
}

// scan markdown folder
let fileTree = {}
function scan (myPath, fatherNode) {
  const items = fs.readdirSync(myPath)
  for (let i = 0; i < items.length; i++) {
    let absolutePath = path.join(myPath, items[i])
    if (fs.statSync(absolutePath).isDirectory()) {
      const curFileTreeNode = {
        name: items[i],
        type: 'Directory',
        children: []
      }
      fatherNode.children.push(curFileTreeNode)
      scan (absolutePath, curFileTreeNode)
    } else {
      const fileInfo = getFileInfo(absolutePath)
      if (fileInfo.isFileAdded) {
        const curFileTreeNode = {
          name: fileInfo.name,
          type: 'File',
          url: fileInfo.url,
          dateTime: fileInfo.dateTime
        }
        fatherNode.children.push(curFileTreeNode)
      }
    }
  }
}

try {
  console.log('begin scan:' + markdownScanPath)

  fileTree = {
    name: 'markdown',
    type: 'Directory',
    children: []
  }
  scan(markdownScanPath, fileTree)
  console.log('fileTree=', fileTree)
  console.log('Begin to Generate markdown/index.js file')
  fs.writeFile(markdownScanPath + '\\index.js', 'export default ' + JSON.stringify(fileTree), function (err) {
    if (err) {
      return console.error(err);
    }
  })
  console.log('Generate markdown/index.js file finished')

} catch(e) {
  console.log('scan markdown folder error:', e)
}
console.log('webpack begin...')

// main pack process
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

const { BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

class Window {
  constructor (option, html, ratio = 1) {
    this.browserWindow = null
    this.option = option
    this.html = html
    this.ratio = ratio
  }

  start () {
    this.browserWindow = new BrowserWindow(this.option)
    this.browserWindow.loadURL(url.format({
      protocol: 'file',
      slashes: true,
      pathname: path.join(__dirname, this.html)
    }))

    /*this.browserWindow.on('resize', () => {
      const [size] = this.browserWindow.getSize()
      const height = Math.floor(size * this.ratio)
  
      this.browserWindow.setSize(size, height)
    });*/
  }
}

module.exports = Window
const Window = require('./window.js')
const KeyType = require('./KeyType.js')

class KeyWindow extends Window {
  constructor () {
    super({
      width: 560,
      height: 200,
      frame: false,
      alwaysOnTop: true,
      maximizable: false,
      minWidth: 280,
      minHeight: 100, 
    }, '/page/key-kartrider.html', 1 / 2.8)
  }

  keyDown (type) {
    this.browserWindow.webContents.send('down', type)
  }

  keyUp (type) {
    this.browserWindow.webContents.send('up', type)
  }
}

module.exports = KeyWindow
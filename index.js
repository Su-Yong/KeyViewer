const electron = require('electron')
const { app, ipcMain } = electron

const KeyWindow = require('./ui/keyWindow.js')
const SettingWindow = require('./ui/settingWindow.js')

const KeyType = require('./ui/KeyType.js')

const path = require('path')

module.paths.push(path.resolve('node_modules'))
module.paths.push(path.resolve('../node_modules'))

const ioHook = require('iohook')

let HEIGHT = 0

const windows = {
  main: new KeyWindow(),
  setting: new SettingWindow()
}

ioHook.on('keydown', event => {
  switch (event.keycode) {
    case 42: //shift
      windows.main.keyDown(KeyType.SHIFT)
      break
    case 44: //z
      windows.main.keyDown(KeyType.Z)
      break
    case 22: case 19: //r
      windows.main.keyDown(KeyType.R)
      break
    case 61000: case 72: case 57416: //up
      windows.main.keyDown(KeyType.UP)
      break
    case 29: //ctrl
      windows.main.keyDown(KeyType.CTRL)
      break
    case 56: //alt
      windows.main.keyDown(KeyType.ALT)
      break
    case 61003: case 75: case 57419: //left
      windows.main.keyDown(KeyType.LEFT)
      break
    case 61008: case 80: case 57424: //down
      windows.main.keyDown(KeyType.DOWN)
      break
    case 61005: case 77: case 57421: //right
      windows.main.keyDown(KeyType.RIGHT)
      break
  }
})

ioHook.on('keyup', event => {
  switch (event.keycode) {
    case 42: //shift
      windows.main.keyUp(KeyType.SHIFT)
      break
    case 44: //z
      windows.main.keyUp(KeyType.Z)
      break
    case 22: case 19: //r
      windows.main.keyUp(KeyType.R)
      break
    case 61000: case 72: case 57416: //up
      windows.main.keyUp(KeyType.UP)
      break
    case 29: //ctrl
      windows.main.keyUp(KeyType.CTRL)
      break
    case 56: //alt
      windows.main.keyUp(KeyType.ALT)
      break
    case 61003: case 75: case 57419: //left
      windows.main.keyUp(KeyType.LEFT)
      break
    case 61008: case 80: case 57424: //down
      windows.main.keyUp(KeyType.DOWN)
      break
    case 61005: case 77: case 57421: //right
      windows.main.keyUp(KeyType.RIGHT)
      break
  }
})

ipcMain.on('action', (event, message) => {
  switch (message) {
    case 'close':
      windows.main.browserWindow.close()
      break;
    case 'set-left':
      windows.main.browserWindow.setPosition(0, HEIGHT - windows.main.browserWindow.getSize()[1])
      break;
  }
})

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  for (var i in displays) {
    HEIGHT += displays[i].bounds.height
  }

  windows.main.start()
  ioHook.start()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
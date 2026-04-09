import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createElectronWindow } from './windows'
import { getSystemInfo } from './utils/index'

// 创建主窗口
function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = createElectronWindow()

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于 electron-vite 实现渲染进程热更新（HMR）
  // 开发环境加载远程URL，生产环境加载本地HTML文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
// 部分API只能在窗口创建后使用
app.whenReady().then(() => {
  // 为Windows系统设置应用用户模型ID
  electronApp.setAppUserModelId('com.electron')

  // 开发环境默认按F12打开/关闭开发者工具
  // 生产环境禁用刷新快捷键（CommandOrControl + R）
  // 参考：https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC通信测试
  ipcMain.on('ping', () => console.log('pong'))

  // 监听获取系统信息的 IPC 请求
  ipcMain.handle('get-system-info', async () => {
    try {
      return await getSystemInfo()
    } catch (error) {
      console.error('Failed to get system info:', error)
      return null
    }
  })

  createWindow()

  app.on('activate', function () {
    // 在macOS系统中，当点击程序坞图标且没有打开任何窗口时，通常会重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 所有窗口关闭时退出应用（macOS除外）
// 在macOS中，应用通常会保持运行，直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 你可以在这里编写应用其他的主进程代码
// 也可以将代码拆分到独立文件中，然后在这里引入

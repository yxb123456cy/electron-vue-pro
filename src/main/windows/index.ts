import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
export function createElectronWindow(): BrowserWindow {
  // 创建浏览器窗口
  return new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })
}

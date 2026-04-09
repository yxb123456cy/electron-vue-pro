import { ipcMain } from 'electron'
import { storeAPI } from './store'
import { lowdbAPI } from './lowdb'
import { sqliteAPI } from './sqlite'

export function setupLocalStoreIPC(): void {
  // electron-store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcMain.handle('store-set', (_, key: string, value: any) => storeAPI.set(key, value))
  ipcMain.handle('store-get', (_, key: string) => storeAPI.get(key))
  ipcMain.handle('store-delete', (_, key: string) => storeAPI.delete(key))
  ipcMain.handle('store-path', () => storeAPI.getPath())
  ipcMain.on('store-open', () => storeAPI.openFolder())

  // lowdb
  ipcMain.handle('lowdb-add', (_, msg: string) => lowdbAPI.addMessage(msg))
  ipcMain.handle('lowdb-get', () => lowdbAPI.getMessages())
  ipcMain.handle('lowdb-clear', () => lowdbAPI.clearMessages())
  ipcMain.handle('lowdb-path', () => lowdbAPI.getPath())
  ipcMain.on('lowdb-open', () => lowdbAPI.openFolder())

  // better-sqlite3
  ipcMain.handle('sqlite-add', (_, name: string, age: number) => sqliteAPI.addUser(name, age))
  ipcMain.handle('sqlite-get', () => sqliteAPI.getUsers())
  ipcMain.handle('sqlite-clear', () => sqliteAPI.clearUsers())
  ipcMain.handle('sqlite-path', () => sqliteAPI.getPath())
  ipcMain.on('sqlite-open', () => sqliteAPI.openFolder())
}

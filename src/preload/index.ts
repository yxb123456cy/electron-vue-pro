import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  // electron-store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeSet: (key: string, value: any) => ipcRenderer.invoke('store-set', key, value),
  storeGet: (key: string) => ipcRenderer.invoke('store-get', key),
  storeDelete: (key: string) => ipcRenderer.invoke('store-delete', key),
  storePath: () => ipcRenderer.invoke('store-path'),
  storeOpen: () => ipcRenderer.send('store-open'),

  // lowdb
  lowdbAdd: (msg: string) => ipcRenderer.invoke('lowdb-add', msg),
  lowdbGet: () => ipcRenderer.invoke('lowdb-get'),
  lowdbClear: () => ipcRenderer.invoke('lowdb-clear'),
  lowdbPath: () => ipcRenderer.invoke('lowdb-path'),
  lowdbOpen: () => ipcRenderer.send('lowdb-open'),

  // better-sqlite3
  sqliteAdd: (name: string, age: number) => ipcRenderer.invoke('sqlite-add', name, age),
  sqliteGet: () => ipcRenderer.invoke('sqlite-get'),
  sqliteClear: () => ipcRenderer.invoke('sqlite-clear'),
  sqlitePath: () => ipcRenderer.invoke('sqlite-path'),
  sqliteOpen: () => ipcRenderer.send('sqlite-open')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

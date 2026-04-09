const Store = (await import('electron-store')).default
import { shell } from 'electron'

const store = new Store()

export const storeAPI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, value: any) => {
    store.set(key, value)
    return true
  },
  get: (key: string) => {
    return store.get(key)
  },
  delete: (key: string) => {
    store.delete(key)
    return true
  },
  getPath: () => {
    return store.path
  },
  openFolder: () => {
    shell.showItemInFolder(store.path)
  }
}

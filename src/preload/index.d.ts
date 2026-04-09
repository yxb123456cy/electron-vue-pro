import { ElectronAPI } from '@electron-toolkit/preload'

export interface SystemInfo {
  cpu: {
    model: string
    cores: number
    usage: string
  }
  memory: {
    total: number
    used: number
    free: number
  }
  disk: {
    name: string
    size: number
    used: number
    usage: number
  }[]
  os: {
    platform: string
    version: string
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSystemInfo: () => Promise<SystemInfo | null>

      // electron-store
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      storeSet: (key: string, value: any) => Promise<boolean>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      storeGet: (key: string) => Promise<any>
      storeDelete: (key: string) => Promise<boolean>
      storePath: () => Promise<string>
      storeOpen: () => void

      // lowdb
      lowdbAdd: (msg: string) => Promise<boolean>
      lowdbGet: () => Promise<string[]>
      lowdbClear: () => Promise<boolean>
      lowdbPath: () => Promise<string>
      lowdbOpen: () => void

      // better-sqlite3
      sqliteAdd: (name: string, age: number) => Promise<number>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sqliteGet: () => Promise<any[]>
      sqliteClear: () => Promise<boolean>
      sqlitePath: () => Promise<string>
      sqliteOpen: () => void
    }
  }
}

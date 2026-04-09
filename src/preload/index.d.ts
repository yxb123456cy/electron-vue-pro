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
    }
  }
}

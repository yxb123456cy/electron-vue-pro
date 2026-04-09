import { app, shell } from 'electron'
import { join } from 'path'

type Data = {
  messages: string[]
}

const defaultData: Data = { messages: [] }
const dbPath = join(app.getPath('userData'), 'db.json')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function initDb(): Promise<any> {
  if (!dbInstance) {
    // 使用动态导入避免可能出现的 ESM / CJS 模块问题
    const { JSONFilePreset } = await import('lowdb/node')
    dbInstance = await JSONFilePreset<Data>(dbPath, defaultData)
  }
  return dbInstance
}

export const lowdbAPI = {
  addMessage: async (msg: string) => {
    const db = await initDb()
    db.data.messages.push(msg)
    await db.write()
    return true
  },
  getMessages: async () => {
    const db = await initDb()
    return db.data.messages
  },
  clearMessages: async () => {
    const db = await initDb()
    db.data.messages = []
    await db.write()
    return true
  },
  getPath: () => dbPath,
  openFolder: () => shell.showItemInFolder(dbPath)
}

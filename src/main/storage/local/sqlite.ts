import Database from 'better-sqlite3'
import { join } from 'path'
import { app, shell } from 'electron'

const dbPath = join(app.getPath('userData'), 'sqlite.db')
let db: Database.Database | null = null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initDb(): any {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    // 初始化表结构
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
      )
    `)
  }
  return db
}

export const sqliteAPI = {
  addUser: (name: string, age: number) => {
    const database = initDb()
    const stmt = database.prepare('INSERT INTO users (name, age) VALUES (?, ?)')
    const info = stmt.run(name, age)
    return info.lastInsertRowid
  },
  getUsers: () => {
    const database = initDb()
    const stmt = database.prepare('SELECT * FROM users')
    return stmt.all()
  },
  clearUsers: () => {
    const database = initDb()
    const stmt = database.prepare('DELETE FROM users')
    stmt.run()
    return true
  },
  getPath: () => dbPath,
  openFolder: () => shell.showItemInFolder(dbPath)
}

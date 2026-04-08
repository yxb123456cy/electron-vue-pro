import { cloneDeep, isNil, omit, pick, uniq, sortBy, round } from 'lodash-es'

// 深拷贝
export function deepClone<T>(obj: T): T {
  return cloneDeep(obj)
}

// 本地存储封装（Electron 渲染进程安全使用）
export const storage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, value: any) => {
    try {
      const str = JSON.stringify(value)
      localStorage.setItem(key, str)
      return true
    } catch {
      return false
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: <T = any>(key: string, defaultValue?: T): T | null => {
    try {
      const val = localStorage.getItem(key)
      if (!val) return defaultValue ?? null
      return JSON.parse(val) as T
    } catch {
      return defaultValue ?? null
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  }
}

// 日期格式化
export function formatDate(date: string | Date | number, fmt = 'yyyy-MM-dd HH:mm:ss'): string {
  const d = new Date(date)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o: any = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'H+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  return fmt
}

// 常用验证
export const validator = {
  isPhone: (val: string) => /^1[3-9]\d{9}$/.test(val),
  isEmail: (val: string) => /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(val),
  isIdCard: (val: string) => /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val),
  isUrl: (val: string) => /^https?:\/\//.test(val),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isEmpty: (val: any) => {
    if (val === null || val === undefined || val === '') return true
    if (Array.isArray(val) && val.length === 0) return true
    if (typeof val === 'object' && Object.keys(val).length === 0) return true
    return false
  }
}

// 文件大小格式化
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

// 类型判断
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toType(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

// 生成随机字符串
export function randomString(len = 16): string {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}
/**
 * 安全获取对象值（防崩溃）
 * @param obj 源对象
 * @param path 属性路径 a.b.c
 * @param defaultValue 默认值
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get(obj: Record<string, any>, path: string, defaultValue?: any): any {
  try {
    return path.split('.').reduce((o, k) => (o || {})[k], obj) ?? defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * 对象剔除空字段（null/undefined/'' 自动删掉）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitEmpty(obj: Record<string, any>): any {
  if (!obj) return {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !isNil(v) && v !== ''))
}

/**
 * 挑选对象某些字段
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pickFields<T = any>(obj: any, fields: string[]): T {
  return pick(obj, fields) as T
}

/**
 * 剔除对象某些字段
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitFields<T = any>(obj: any, fields: string[]): T {
  return omit(obj, fields) as T
}

/**
 * 数组去重
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniqueArray<T = any>(arr: T[]): T[] {
  return uniq(arr)
}

/**
 * 数组根据字段排序
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortArray<T = any>(arr: T[], field: string, order: 'asc' | 'desc' = 'asc'): T[] {
  const sorted = sortBy(arr, field)
  return order === 'desc' ? sorted.reverse() : sorted
}

/**
 * 数字千分位格式化
 */
export function formatNumber(num: number | string): string {
  const n = Number(num)
  return isNaN(n) ? '0' : n.toLocaleString('zh-CN')
}

/**
 * 保留小数（四舍五入）
 */
export function toFixed(num: number | string, digits = 2): number {
  const n = Number(num)
  return isNaN(n) ? 0 : round(n, digits)
}

/**
 * 类名拼接（替代 classNames，轻量）
 * @param args 支持 string | object | array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function classNames(...args: any[]): string {
  const classes: string[] = []
  for (const arg of args) {
    if (!arg) continue
    const type = typeof arg
    if (type === 'string' || type === 'number') {
      classes.push(String(arg))
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg))
    } else if (type === 'object') {
      for (const key in arg) {
        if (arg[key]) classes.push(key)
      }
    }
  }
  return classes.filter(Boolean).join(' ')
}

/**
 * 版本号比较 v1 > v2 return 1; 相等 0; 小于 -1
 */
export function compareVersion(v1: string, v2: string): number {
  const vs1 = v1.split('.').map(Number)
  const vs2 = v2.split('.').map(Number)
  const len = Math.max(vs1.length, vs2.length)
  for (let i = 0; i < len; i++) {
    const a = vs1[i] || 0
    const b = vs2[i] || 0
    if (a > b) return 1
    if (a < b) return -1
  }
  return 0
}

/**
 * 简单字符串脱敏：手机号/身份证/邮箱
 */
export function desensitize(str: string, type: 'phone' | 'idCard' | 'email' = 'phone'): string {
  if (!str) return ''
  if (type === 'phone') return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  if (type === 'idCard') return str.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
  if (type === 'email') return str.replace(/(.{2}).*(@.*)/, '$1****$2')
  return str
}

/**
 * 判断颜色是否为深色（用于自动切换文字黑白）
 */
export function isDarkColor(color: string): boolean {
  color = color.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

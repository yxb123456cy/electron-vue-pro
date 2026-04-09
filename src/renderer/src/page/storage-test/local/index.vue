<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// --- Web Storage (localStorage) ---
const webKey = ref('')
const webValue = ref('')
const webResult = ref('')

const setWebStorage = (): void => {
  if (!webKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  localStorage.setItem(webKey.value, webValue.value)
  ElMessage.success('Web Storage 设置成功')
}
const getWebStorage = (): void => {
  if (!webKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  const val = localStorage.getItem(webKey.value)
  webResult.value = val !== null ? val : '未找到该键值'
}
const deleteWebStorage = (): void => {
  if (!webKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  localStorage.removeItem(webKey.value)
  webResult.value = ''
  ElMessage.success('Web Storage 删除成功')
}

// --- Electron-Store ---
const storeKey = ref('')
const storeValue = ref('')
const storeResult = ref('')
const storePath = ref('')

const fetchStorePath = async (): Promise<void> => {
  if (window.api && window.api.storePath) {
    storePath.value = await window.api.storePath()
  }
}

const setStore = async (): Promise<void> => {
  if (!storeKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  await window.api.storeSet(storeKey.value, storeValue.value)
  ElMessage.success('Electron-Store 设置成功')
}
const getStore = async (): Promise<void> => {
  if (!storeKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  const val = await window.api.storeGet(storeKey.value)
  storeResult.value = val !== undefined ? String(val) : '未找到该键值'
}
const deleteStore = async (): Promise<void> => {
  if (!storeKey.value) {
    ElMessage.warning('请输入键名')
    return
  }
  await window.api.storeDelete(storeKey.value)
  storeResult.value = ''
  ElMessage.success('Electron-Store 删除成功')
}
const openStoreFolder = (): void => {
  window.api.storeOpen()
}

// --- Lowdb ---
const lowdbMsg = ref('')
const lowdbList = ref<string[]>([])
const lowdbPath = ref('')

const fetchLowdbPath = async (): Promise<void> => {
  if (window.api && window.api.lowdbPath) {
    lowdbPath.value = await window.api.lowdbPath()
  }
}
const addLowdb = async (): Promise<void> => {
  if (!lowdbMsg.value) {
    ElMessage.warning('请输入消息内容')
    return
  }

  await window.api.lowdbAdd(lowdbMsg.value)
  lowdbMsg.value = ''
  ElMessage.success('Lowdb 添加成功')
  getLowdb()
}
const getLowdb = async (): Promise<void> => {
  lowdbList.value = await window.api.lowdbGet()
}
const clearLowdb = async (): Promise<void> => {
  await window.api.lowdbClear()
  ElMessage.success('Lowdb 清空成功')
  getLowdb()
}
const openLowdbFolder = (): void => {
  window.api.lowdbOpen()
}

// --- Better-SQLite3 ---
const sqliteName = ref('')
const sqliteAge = ref<number | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sqliteList = ref<any[]>([])
const sqlitePath = ref('')

const fetchSqlitePath = async (): Promise<void> => {
  if (window.api && window.api.sqlitePath) {
    sqlitePath.value = await window.api.sqlitePath()
  }
}
const addSqlite = async (): Promise<void> => {
  if (!sqliteName.value || !sqliteAge.value) {
    ElMessage.warning('请输入姓名和年龄')
    return
  }
  await window.api.sqliteAdd(sqliteName.value, sqliteAge.value)
  sqliteName.value = ''
  sqliteAge.value = null
  ElMessage.success('SQLite 添加成功')
  getSqlite()
}
const getSqlite = async (): Promise<void> => {
  sqliteList.value = await window.api.sqliteGet()
}
const clearSqlite = async (): Promise<void> => {
  await window.api.sqliteClear()
  ElMessage.success('SQLite 清空成功')
  getSqlite()
}
const openSqliteFolder = (): void => {
  window.api.sqliteOpen()
}

onMounted(() => {
  fetchStorePath()
  fetchLowdbPath()
  fetchSqlitePath()

  if (window.api) {
    getLowdb()
    getSqlite()
  }
})
</script>

<template>
  <div class="storage-test-container">
    <el-row :gutter="20">
      <!-- Web Storage -->
      <el-col :span="12">
        <el-card class="storage-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Web Storage (LocalStorage)</span>
            </div>
          </template>
          <div class="storage-content">
            <el-input v-model="webKey" placeholder="键名 (Key)" class="mb-2" />
            <el-input v-model="webValue" placeholder="键值 (Value)" class="mb-2" />
            <div class="btn-group">
              <el-button type="primary" @click="setWebStorage">设置</el-button>
              <el-button type="success" @click="getWebStorage">读取</el-button>
              <el-button type="danger" @click="deleteWebStorage">删除</el-button>
            </div>
            <div class="result-box" v-if="webResult">
              读取结果: <strong>{{ webResult }}</strong>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- Electron-Store -->
      <el-col :span="12">
        <el-card class="storage-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Electron-Store (键值对配置)</span>
            </div>
          </template>
          <div class="storage-content">
            <div class="path-info">
              <span class="path-text">路径: {{ storePath }}</span>
              <el-button size="small" type="primary" plain @click="openStoreFolder"
                >打开目录</el-button
              >
            </div>
            <el-input v-model="storeKey" placeholder="键名 (Key)" class="mb-2" />
            <el-input v-model="storeValue" placeholder="键值 (Value)" class="mb-2" />
            <div class="btn-group">
              <el-button type="primary" @click="setStore">设置</el-button>
              <el-button type="success" @click="getStore">读取</el-button>
              <el-button type="danger" @click="deleteStore">删除</el-button>
            </div>
            <div class="result-box" v-if="storeResult">
              读取结果: <strong>{{ storeResult }}</strong>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <!-- Lowdb -->
      <el-col :span="12">
        <el-card class="storage-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Lowdb (JSON 文档存储)</span>
            </div>
          </template>
          <div class="storage-content">
            <div class="path-info">
              <span class="path-text">路径: {{ lowdbPath }}</span>
              <el-button size="small" type="primary" plain @click="openLowdbFolder"
                >打开目录</el-button
              >
            </div>
            <el-input v-model="lowdbMsg" placeholder="输入消息" class="mb-2">
              <template #append>
                <el-button @click="addLowdb">添加</el-button>
              </template>
            </el-input>
            <div class="btn-group">
              <el-button type="success" @click="getLowdb">刷新列表</el-button>
              <el-button type="danger" @click="clearLowdb">清空数据</el-button>
            </div>
            <div class="list-box">
              <el-tag v-for="(msg, i) in lowdbList" :key="i" class="mr-2 mb-2">{{ msg }}</el-tag>
              <el-empty v-if="lowdbList.length === 0" :image-size="40" description="暂无数据" />
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- Better-SQLite3 -->
      <el-col :span="12">
        <el-card class="storage-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>Better-SQLite3 (关系型数据)</span>
            </div>
          </template>
          <div class="storage-content">
            <div class="path-info">
              <span class="path-text">路径: {{ sqlitePath }}</span>
              <el-button size="small" type="primary" plain @click="openSqliteFolder"
                >打开目录</el-button
              >
            </div>
            <div class="flex gap-2 mb-2">
              <el-input v-model="sqliteName" placeholder="姓名" />
              <el-input v-model.number="sqliteAge" type="number" placeholder="年龄" />
            </div>
            <div class="btn-group">
              <el-button type="primary" @click="addSqlite">添加用户</el-button>
              <el-button type="success" @click="getSqlite">刷新列表</el-button>
              <el-button type="danger" @click="clearSqlite">清空数据</el-button>
            </div>
            <div class="list-box">
              <el-table
                :data="sqliteList"
                style="width: 100%"
                size="small"
                height="150"
                v-if="sqliteList.length > 0"
              >
                <el-table-column prop="id" label="ID" width="60" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="age" label="年龄" width="80" />
              </el-table>
              <el-empty v-else :image-size="40" description="暂无数据" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
// use custom global scss styles variable
@use '@renderer/assets/styles/variables.scss' as *;

.storage-test-container {
  .storage-card {
    height: 100%;
    min-height: 380px;

    .card-header {
      font-weight: bold;
      color: $cus-primary-color;
    }

    .storage-content {
      .path-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $cus-bg-color;
        padding: 8px 12px;
        border-radius: $cus-border-radius;
        margin-bottom: 16px;
        font-size: 12px;

        .path-text {
          color: $cus-text-light;
          word-break: break-all;
          margin-right: 10px;
        }
      }

      .mb-2 {
        margin-bottom: 12px;
      }

      .mt-4 {
        margin-top: 20px;
      }

      .mr-2 {
        margin-right: 8px;
      }

      .flex {
        display: flex;
      }

      .gap-2 {
        gap: 8px;
      }

      .btn-group {
        margin-bottom: 16px;
      }

      .result-box {
        padding: 12px;
        background-color: #f0f9eb;
        color: #67c23a;
        border-radius: $cus-border-radius;
      }

      .list-box {
        margin-top: 12px;
        max-height: 180px;
        overflow-y: auto;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { DataLine, Monitor, User, Connection } from '@element-plus/icons-vue'

const cardData = ref([
  { title: '总访问量', value: '1,234', icon: DataLine, color: '#ffb6c1' },
  { title: '系统状态', value: '运行中', icon: Monitor, color: '#87ceeb' },
  { title: '活跃用户', value: '89', icon: User, color: '#ffd1dc' },
  { title: 'IPC 连接', value: '正常', icon: Connection, color: '#b0e0e6' }
])
</script>

<template>
  <div class="dashboard-container">
    <div class="welcome-box">
      <h2>欢迎使用 Electron Vue PRO (Electron + Vue3)</h2>
      <p>基于 Electron-Vite + Vue3 + TS + ElementPlus 构建的现代化桌面端应用架构。</p>
    </div>

    <el-row :gutter="20" class="data-cards">
      <el-col v-for="(item, index) in cardData" :key="index" :span="6">
        <el-card shadow="hover" class="data-card">
          <div class="card-icon" :style="{ backgroundColor: item.color }">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
          </div>
          <div class="card-info">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-value">{{ item.value }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-section">
      <el-col :span="16">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>应用性能监控</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-empty description="性能数据图表 (待接入)" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
            </div>
          </template>
          <div class="sys-info">
            <div class="info-item">
              <span class="label">操作系统:</span>
              <span class="value">Windows_NT</span>
            </div>
            <div class="info-item">
              <span class="label">Electron:</span>
              <span class="value">v30.0.0</span>
            </div>
            <div class="info-item">
              <span class="label">Node.js:</span>
              <span class="value">v20.x.x</span>
            </div>
            <div class="info-item">
              <span class="label">V8 引擎:</span>
              <span class="value">v12.x.x</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
// use custom global scss styles variable
@import '@renderer/assets/styles/variables.scss';

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.welcome-box {
  background-color: $cus-header-bg;
  padding: 24px;
  border-radius: $cus-border-radius;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  h2 {
    margin: 0 0 10px 0;
    color: $cus-primary-color;
  }

  p {
    margin: 0;
    color: $cus-text-light;
    font-size: 14px;
  }
}

.data-cards {
  .data-card {
    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .card-icon {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: white;
      margin-right: 16px;
    }

    .card-info {
      .card-title {
        font-size: 14px;
        color: $cus-text-light;
        margin-bottom: 8px;
      }

      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: $cus-text-color;
      }
    }
  }
}

.chart-section {
  .chart-card {
    height: 100%;

    .card-header {
      font-weight: bold;
      color: $cus-text-color;
    }

    .chart-placeholder {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $cus-bg-color;
      border-radius: $cus-border-radius;
    }

    .sys-info {
      height: 300px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .info-item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px dashed $cus-border-color;

        .label {
          color: $cus-text-light;
        }

        .value {
          font-weight: bold;
          color: $cus-secondary-color;
        }
      }
    }
  }
}
</style>

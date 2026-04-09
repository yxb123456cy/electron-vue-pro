<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Menu as IconMenu,
  Monitor,
  DataLine,
  Setting,
  User,
  FolderOpened,
  Box,
  VideoCamera,
  Odometer,
  Connection
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)

const activeMenu = computed(() => {
  return route.path
})

const handleSelect = (key: string): void => {
  router.push(key)
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '240px'" class="layout-aside">
      <div class="logo-container">
        <img src="@renderer/assets/electron.svg" alt="logo" class="logo-img" />
        <span v-show="!isCollapse" class="logo-text">Electron Vue PRO</span>
      </div>

      <el-menu
        :default-active="activeMenu"
        class="layout-menu"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <el-menu-item index="/dashboard">
          <el-icon>
            <Odometer />
          </el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-menu-item index="/teacher">
          <el-icon>
            <User />
          </el-icon>
          <template #title>教师管理</template>
        </el-menu-item>
        <el-menu-item index="/ai-test">
          <el-icon>
            <Monitor />
          </el-icon>
          <template #title>AI 能力</template>
        </el-menu-item>
        <el-menu-item index="/api-test">
          <el-icon>
            <Connection />
          </el-icon>
          <template #title>API 测试</template>
        </el-menu-item>
        <el-menu-item index="/ipc-test">
          <el-icon>
            <DataLine />
          </el-icon>
          <template #title>IPC 通信</template>
        </el-menu-item>

        <el-sub-menu index="/storage">
          <template #title>
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>存储测试</span>
          </template>
          <el-menu-item index="/storage-local">本地存储</el-menu-item>
          <el-menu-item index="/storage-cloud">云存储</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/components-test">
          <el-icon>
            <Setting />
          </el-icon>
          <template #title>通用组件</template>
        </el-menu-item>
        <el-menu-item index="/docker">
          <el-icon>
            <Box />
          </el-icon>
          <template #title>Docker 能力</template>
        </el-menu-item>
        <el-menu-item index="/terminal">
          <el-icon>
            <Monitor />
          </el-icon>
          <template #title>仿终端能力</template>
        </el-menu-item>
        <el-menu-item index="/big-screen">
          <el-icon>
            <VideoCamera />
          </el-icon>
          <template #title>大屏展示</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="layout-main-container">
      <!-- 顶部自定义标题栏和Header -->
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-icon" @click="isCollapse = !isCollapse">
            <IconMenu v-if="!isCollapse" />
            <Setting v-else />
          </el-icon>

          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="route.meta.title">{{ route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 窗口拖拽区域（标题栏中间空白区域用于拖拽移动窗口） -->
        <div class="header-drag-area"></div>

        <div class="header-right">
          <!-- 用户信息等 -->
          <el-dropdown class="user-dropdown">
            <span class="el-dropdown-link">
              Admin
              <el-icon class="el-icon--right">
                <Setting />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容区 -->
      <el-main class="layout-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
// use custom global scss styles variable
@import '../assets/styles/variables.scss';

.layout-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.layout-aside {
  background-color: $cus-sidebar-bg;
  border-right: 1px solid $cus-border-color;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;

  .logo-container {
    height: $cus-header-height;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $cus-border-color;

    // Electron 无边框窗口可拖拽区域
    -webkit-app-region: drag;

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-text {
      margin-left: 12px;
      font-weight: bold;
      font-size: 16px;
      color: $cus-primary-color;
      white-space: nowrap;
    }
  }

  .layout-menu {
    flex: 1;
    border-right: none;
    overflow-y: auto;
  }
}

.layout-main-container {
  display: flex;
  flex-direction: column;
}

.layout-header {
  height: $cus-header-height;
  background-color: $cus-header-bg;
  border-bottom: 1px solid $cus-border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  .header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
    // 按钮禁止拖拽，防止点击失效
    -webkit-app-region: no-drag;

    .collapse-icon {
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
      color: $cus-text-color;

      &:hover {
        color: $cus-primary-color;
      }
    }
  }

  .header-drag-area {
    flex: 1;
    height: 100%;
    // 设置为可拖拽区域
    -webkit-app-region: drag;
  }

  .header-right {
    display: flex;
    align-items: center;
    height: 100%;
    // 右侧功能区禁止拖拽
    -webkit-app-region: no-drag;

    .user-dropdown {
      margin-right: 20px;
      cursor: pointer;
      color: $cus-text-color;

      &:hover {
        color: $cus-primary-color;
      }
    }

    .window-controls {
      display: flex;
      height: 100%;

      .control-btn {
        width: 46px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 14px;
        color: $cus-text-color;

        &:hover {
          background-color: $cus-bg-color;
        }

        &.close:hover {
          background-color: #f56c6c;
          color: white;
        }
      }
    }
  }
}

.layout-main {
  background-color: $cus-bg-color;
  padding: 20px;
  overflow-y: auto;
}

/* 页面切换动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

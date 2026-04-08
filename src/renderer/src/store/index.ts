import { createPinia } from 'pinia'
// 导入Pinia持久化插件;
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建Pinia实例
const pinia = createPinia()
// 使用Pinia持久化插件
pinia.use(piniaPluginPersistedstate)
// 导出pinia实例;
export default pinia

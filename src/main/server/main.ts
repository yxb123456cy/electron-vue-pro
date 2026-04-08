import { Hono } from 'hono'
import { serve } from '@hono/node-server'
const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))
const server = serve({
  fetch: app.fetch,
  port: 8787
})
// graceful shutdown
process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
// Node.js环境下不导出 Bun环境下导出;
// export default app

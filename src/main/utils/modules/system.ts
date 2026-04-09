import si from 'systeminformation'

// 基于systeminformation库获取系统基础信息
export async function getSystemInfo(): Promise<{
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
}> {
  const [cpu, load, mem, disk, os] = await Promise.all([
    si.cpu(),
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.osInfo()
  ])
  const res = {
    cpu: {
      model: cpu.brand,
      cores: cpu.cores,
      usage: load.currentLoad.toFixed(2)
    },
    memory: {
      total: mem.total,
      used: mem.used,
      free: mem.free
    },
    disk: disk.map((d) => ({
      name: d.fs,
      size: d.size,
      used: d.used,
      usage: d.use
    })),
    os: {
      platform: os.platform,
      version: os.release
    }
  }
  console.log(JSON.stringify(res))
  return res
}

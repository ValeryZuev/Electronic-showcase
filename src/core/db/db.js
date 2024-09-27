const storage = sessionStorage

export default {
  get (key) {
    const value = storage.getItem(key)
    return JSON.parse(value)
  },
  async set (key, value) {
    await storage.setItem(key, JSON.stringify(value))
    return value
  },
  async delete (key) {
    storage.removeItem(key)
  }
}

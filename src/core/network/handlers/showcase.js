export default {
  normalizeCategories(data) {
    return data.map(e => {
      return {
        label: e.substr(0, 1).toUpperCase() + e.substr(1),
        value: e
      }
    })
  }
}

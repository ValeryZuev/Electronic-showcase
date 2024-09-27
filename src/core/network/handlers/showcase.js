import { useShowcase } from '@/stores/showcase.js'

export default {
  normalizeCategories(data) {
    const output = {}
    data.forEach(e => {
      output[e] = {
        label: e.substr(0, 1).toUpperCase() + e.substr(1),
        value: e
      }
    })
    return output
  },
  normalizeProducts(data) {
    const { filters } = useShowcase()
    const { from, to } = filters.price.value

    return data.filter(product =>
      product.price >= from && product.price <= to
    )
  }
}

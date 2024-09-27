import { defineStore } from 'pinia'
import { api } from '@/core/api.js'

export const useShowcase = defineStore('showcase', {
  state: () => ({
    isLoading: true,
    categories: [],
    products: Array(8),
    filters: {
      category: {
        type: 'select',
        label: 'Категория',
        options: {
          all: { label: 'Все продукты', value: 'all' }
        },
        value: 'all'
      },
      price: {
        type: 'range',
        label: 'Цена',
        min: 0,
        max: 9999,
        value: { from: 0, to: 9999 }
      },
    },
    currentCategory: null,
    defaultFilterValues: {}
  }),
  actions: {
    async getProducts() {
      this.isLoading = true
      const { category } = this.filters
      const payload = {}
      let method = 'getAllProducts'

      if (category.value !== 'all') {
        method = 'getProductsByCategory'
        payload.category = category.value
      }

      return await api[method]({ ...payload }).finally(() =>
        this.isLoading = false)
    },
    async getCategories() {
      try {
        const response = await api.getCategories()
        Object.assign(this.filters.category.options, response)
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    },
    applyFilters() {
      this.setCurrentCategory()
      this.getProducts()
    },
    resetFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key].value = this.defaultFilterValues[key].value;
      });
      this.setCurrentCategory()
      this.getProducts()
    },
    setDefaultFilterValues() {
      if (Object.keys(this.defaultFilterValues).length) return
      this.defaultFilterValues = JSON.parse(JSON.stringify(this.filters));
      this.setCurrentCategory()
    },
    setCurrentCategory() {
      const { category } = this.filters
      this.currentCategory = category.options[category.value]
    }
  }
})

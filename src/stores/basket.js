import { defineStore } from 'pinia'

export const useBasket = defineStore('basket', {
  state: () => ({
    items: []
  }),
  actions: {}
})

import { defineStore } from 'pinia'
import db from '@/core/db/db'

export const useBasket = defineStore('basket', {
  state: () => ({
    items: db.get('rgd-basket') ? JSON.parse(db.get('rgd-basket')) : {}
  }),
  getters: {
    sumOfCounts(state) {
      const output = {
        count: Object.values(state.items).reduce((sum, item) => {
          return sum + item.count
        }, 0),
        sum: Object.values(state.items).reduce((sum, item) => {
          return sum + item.price * item.count
        }, 0)
      }
      return output
    }
  },
  actions: {
    addToCart(product) {
      if (product.id in this.items) {
        this.items[product.id].count += 1
      } else {
        this.items[product.id] = {
          ...product,
          count: 1
        }
      }
      this.saveStateToSession()
    },
    removeToCart(id) {
      if (!(id in this.items)) return
      delete this.items[id]
      this.saveStateToSession()
    },
    clearCart() {
      this.items = {}
      this.saveStateToSession()
    },
    changeCountItem(id, type) {
      if (!type || !id) return

      switch (type) {
        case 'inc':
          this.items[id].count++
          break;
        case 'dec':
          if (this.items[id].count <= 1) {
            this.removeToCart(id)
            return
          }
          this.items[id].count--
          break
      }

      this.saveStateToSession()
    },
    saveStateToSession() {
      db.set('rgd-basket', JSON.stringify(this.items))
    }
  }
})

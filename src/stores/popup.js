import { defineStore } from 'pinia'

export const usePopup = defineStore('popup', {
  state: () => ({
    type: null,
    payload: null,
    controller: null
  }),
  actions: {
    open(type, payload = null) {
      let resolve
      const openedPromise = new Promise((success) => {
        resolve = success
      })

      this.controller = { resolve }
      this.type = type
      this.payload = payload

      return openedPromise
    },
    close(response) {
      this.controller.resolve(response ? response : this.payload)
      this.type = null
      this.payload = null
    },
  },
})

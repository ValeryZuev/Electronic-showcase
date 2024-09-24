### Stores

Хранилище(Pinia) является основным способом хранения и получения данных, любые данные которые используются
между компонентами обязательно должны в нем находиться.

На каждую категорию данных создается отдельное хранилище.
Общатся между хранилищами не запрещено.

Название переменной хранилища должно иметь вид - use(STORE_NAME)Store, useUserStore.

#### Пример хранилища

```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: 'vue',
    token: '1337',
    address: {
      country: 'US',
      city: 'Los Angeles'
    }
  }),
  getters: {
    countryAndCityAsString: (state) => `
      Country: ${state.address.country},
      City: ${state.address.city}
    `
  },
  actions: {
    changeToken (token) {
      this.token = token
    }
  }
})
```
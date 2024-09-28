import { defineStore } from 'pinia'
import db from '@/core/db/db'

export const useUser = defineStore('user', {
  state: () => ({
    accessToken: db.get('rgd-access') ?? null
  }),
})

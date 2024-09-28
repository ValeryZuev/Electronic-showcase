import { useUser } from '@/stores/user.js'
import { pages } from '@/config/project/index.js'

export async function routerAuthController(to, next) {
  const { accessToken } = useUser()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!accessToken) {
      next(pages.auth)
    } else {
      next()
    }
  } else {
    next()
  }
}

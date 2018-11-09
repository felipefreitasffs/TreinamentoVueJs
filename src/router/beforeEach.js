import { LocalStorage } from 'quasar'

export default (to, from, next) => {
  console.log(to.matched)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!LocalStorage.get.item('user')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}

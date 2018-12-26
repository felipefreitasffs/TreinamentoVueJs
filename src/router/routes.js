const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('pages/Users.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'branches',
        path: 'branches',
        component: () => import('pages/Branches.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/Login.vue'),
    props: (route) => ({
      redirect: route.query.redirect
    })
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

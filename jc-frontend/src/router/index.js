import { createRouter, createWebHistory } from 'vue-router'
import verifyToken from '../utils/verifyToken'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import FinanceDashboard from '../components/dashboards/FinanceDashboard.vue'
import TraineesDashboard from '../components/dashboards/TraineesDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: MainView,
      component: MainView,
      meta:{requiresAuth: true},
      children: [
        {
        path: '/',
        component: FinanceDashboard
        },
        {
          path: 'trainees',
          component: TraineesDashboard
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const loggedIn = await verifyToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(`passou aqui sendo que Logado é ${loggedIn} e precisa de autentificação? ${requiresAuth}`)
  if( requiresAuth && !loggedIn){
    next('/login')
  }else{
    console.log("passou aqui tambem")
    next()
    
  }
})

export default router

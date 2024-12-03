import { createRouter, createWebHistory } from 'vue-router'
import verifyToken from '../utils/verifyToken'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import FinanceDashboard from '../views/dashboards/FinanceDashboard.vue'
import TraineesDashboard from '../views/dashboards/TraineesDashboard.vue'
import PaymentsPlanDashboard from '../views/dashboards/PaymentsPlanDashboard.vue'

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
        },
        {
          path: 'payments-plan',
          component: PaymentsPlanDashboard
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const loggedIn = await verifyToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
 
  if( requiresAuth && !loggedIn){
    next('/login')
  }else{
    next()    
  }
})

export default router

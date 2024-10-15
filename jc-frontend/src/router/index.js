import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import FinanceDashboard from '../components/FinanceDashboard.vue'
import TraineesDashboard from '../components/TraineesDashboard.vue'

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

export default router

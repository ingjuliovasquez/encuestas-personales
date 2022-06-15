import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Survey from '../views/user/Survey.vue'
import Login from '../views/auth/Login.vue'
import SurveysList from '../views/admin/SurveysList.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter)

// * Validacion de usuario
async function validateAuth(to, from, next) {
  next();

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) next();
    if (to.name != 'survey' && to.name != 'login' && !user) next({ name: 'survey' });
    if (to.name == 'login' && user || to.name == 'survey' && user) next({ name: 'surveys' })
  });
}

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/survey',
        name: 'survey',
        component: Survey
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    children: [
      {
        path: '/surveys',
        name: 'surveys',
        component: SurveysList
      },
      {
        path: '/survey/:surveyId',
        name: 'survey_edit',
        props: true,
        component: Survey
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// * Guard rutas global 
router.beforeEach(validateAuth);

export default router

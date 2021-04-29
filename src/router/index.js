import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDescription from '../views/ProjectDescription.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCytoscape from 'vue-cytoscape'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import TrainScheduling from "../views/TrainScheduling";
import IntervalGraphColoringVisual from "../views/IntervalGraphColoringVisual";
import CriticalPath from "../views/CriticalPath";


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueRouter)

Vue.use(VueCytoscape);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projectDescription',
    name: 'ProjectDescription',
    component: ProjectDescription
  },
  {
    path: '/trainScheduling',
    name: 'TrainScheduling',
    component: TrainScheduling
  },
  {
    path: '/intervalColoring',
    name: 'IntervalColoringVisual',
    component: IntervalGraphColoringVisual
  },
  {
    path: '/criticalPath',
    name: 'CriticalPath',
    component: CriticalPath,
  },
]

const router = new VueRouter({
  routes
})

export default router

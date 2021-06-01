import Vue from 'vue'
import VueRouter from 'vue-router'


import ProjectDescription from '../views/ProjectDescription.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCytoscape from 'vue-cytoscape'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import TrainScheduling from "../views/TrainScheduling";
import IntervalColoring from "../views/IntervalColoring";
import CriticalPath from "../views/CriticalPath";
import JobAssignmentComponent from "../views/JobAssignmentComponent";
import IntervalGraphColoringPanel from "../views/IntervalGraphColoringPanel";
import MatchingAlgorithmPanel from "../views/MatchingAlgorithmPanel";


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueRouter)

Vue.use(VueCytoscape);

const routes = [
  {
    path: '/',
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
    name: 'IntervalColoring',
    component: IntervalColoring
  },
  {
    path: '/intervalColoringVisual',
    name: 'IntervalColoringVisual',
    component: IntervalGraphColoringPanel
  },
  {
    path: '/matchingVisual',
    name: 'MatchingVisual',
    component: MatchingAlgorithmPanel
  },
  {
    path: '/criticalPath',
    name: 'CriticalPath',
    component: CriticalPath,
  },
  {
    path: '/jobAssignment',
    name: 'JobAssignmentComponent',
    component: JobAssignmentComponent
  }
]

const router = new VueRouter({
  routes
})

export default router

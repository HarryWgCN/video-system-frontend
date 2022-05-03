import Vue from 'vue'
import Router from 'vue-router'
import Relations from '@/components/info/relations.vue'
import Description from '@/components/info/description'
import Frames from '@/components/info/process_info/Frames'
import ObjDetection from '@/components/info/process_info/ObjDetection'
import FaceCluster from '@/components/info/process_info/FaceCluster'
import PersonClusters from '@/components/info/PersonClusters'
import PersonFeatures from '@/components/info/PersonFeatures'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/relations',
      name: 'Relations',
      component: Relations
    },
    {
      path: '/description',
      name: 'Description',
      component: Description
    },
    {
      path: '/frames',
      name: 'Frames',
      component: Frames
    },
    {
      path: '/objdetection',
      name: 'ObjDetection',
      component: ObjDetection
    },
    {
      path: '/facecluster',
      name: 'FaceCluster',
      component: FaceCluster
    },
    {
      path: '/personclusters',
      name: 'PersonClusters',
      component: PersonClusters
    },
    {
      path: '/personfeatures',
      name: 'PersonFeatures',
      component: PersonFeatures
    }
  ]
})

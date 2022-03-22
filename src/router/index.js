import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import App from '@/App'
// import VideoPlayer from '@/components/video_player.vue'
import Relations from '@/components/info/relations.vue'
import Description from '@/components/info/description'
// import Main from '@/components/main.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   component: Main
    //   // redirect: '/video'
    // },
    {
      path: '/video',
      name: 'Video',
      component: {render: (e) => e('router-view')},
      children: [
        {
          path: 'relations',
          name: 'Relations',
          component: Relations
        },
        {
          path: 'description',
          name: 'Description',
          component: Description
        }
      ]
    }
  ]
})

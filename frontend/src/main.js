import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import VueYouTubeEmbed from 'vue-youtube-embed'

import Nyheter from './components/Nyheter.vue'
import Om from './components/Om.vue'
import Kontakt from './components/Kontakt.vue'
import Artikel from './components/Artikel.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(VueYouTubeEmbed)

const router = new VueRouter({
  routes: [
    { component: Nyheter, path: '/'},
    { component: Om, path: '/om'},
    { component: Kontakt, path: '/kontakt'},
    { component: Artikel, path: '/:artikel'}
  ]
})

const store = new Vuex.Store({
  state: {
    articles: [],
    article: null
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

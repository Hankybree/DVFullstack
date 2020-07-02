import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Views

import NewsView from './views/NewsView.vue'
import AboutView from './views/AboutView.vue'
import ContactView from './views/ContactView.vue'
import ArticleView from './views/ArticleView.vue'

// Scripts

import { actions } from './scripts/actions.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: NewsView, path: '/'},
    { component: AboutView, path: '/om'},
    { component: ContactView, path: '/kontakt'},
    { component: ArticleView, path: '/:artikel'}
  ]
})

const store = new Vuex.Store({
  state: {
    articles: [],
    article: null,
    commentUrl: ''
  },
  mutations: {
    setArticles(state, newArticles) {
      state.articles = newArticles
    },
    setArticle(state, newArticle) {
      state.article = newArticle
    },
    setCommentUrl(state, newCommentUrl) {
      state.commentUrl = newCommentUrl
    }
  },
  actions: actions
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

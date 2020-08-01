import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { actions } from './scripts/actions.js'

import AdminView from './views/AdminView.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: AdminView, path: '/' }
  ]
})

const store = new Vuex.Store({
  state: {
    userName: '',
    password: '',
    loggedIn: false,
    isPosting: true,
    articles: [],
    articleId: -1,
    articleType: 'article',
    articleImage: '',
    articleVideo: '',
    articleHeader: '',
    articleIngress: '',
    articleBody: '',
    articleAuthor: ''
  },
  mutations: {
    setUserName(state, newUserName) {
      state.userName = newUserName
    },
    setPassword(state, newPassword) {
      state.password = newPassword
    },
    setLoggedIn(state, newLoggedIn) {
      state.loggedIn = newLoggedIn
    },
    setIsPosting(state, newIsPosting) {
      state.isPosting = newIsPosting
    },
    setArticles(state, newArticles) {
      state.articles = newArticles
    },
    setArticleId(state, newArticleId) {
      state.articleId = newArticleId
    },
    setArticleType(state, newArticleType) {
      state.articleType = newArticleType
    },
    setArticleImage(state, newArticleImage) {
      state.articleImage = newArticleImage
    },
    setArticleVideo(state, newArticleVideo) {
      state.articleVideo = newArticleVideo
    },
    setArticleHeader(state, newArticleHeader) {
      state.articleHeader = newArticleHeader
    },
    setArticleIngress(state, newArticleIngress) {
      state.articleIngress = newArticleIngress
    },
    setArticleBody(state, newArticleBody) {
      state.articleBody = newArticleBody
    },
    setArticleAuthor(state, newArticleAuthor) {
      state.articleAuthor = newArticleAuthor
    },
  },
  actions: actions
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

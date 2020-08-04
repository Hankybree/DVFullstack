import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { actions } from './scripts/actions.js'

import LogInView from './views/LogInView.vue'
import PostView from './views/PostView.vue'
import EditView from './views/EditView.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: LogInView, path: '/' },
    { component: PostView, path: '/publicera' },
    { component: EditView, path: '/redigera' }
  ]
})

const store = new Vuex.Store({
  state: {
    userName: '',
    password: '',
    loggedIn: false,
    imageUrl: null,
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
    setImageUrl(state, newImageUrl) {
      state.imageUrl = newImageUrl
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

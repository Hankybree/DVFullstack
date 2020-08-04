<template>
  <div class="content">
    <br>
    <div class="articles" v-for="(article, index) in $store.state.articles" :key="index">
      <div v-if="article.articleType === 'article'">
        <div>
          <img class="image" :src="article.articleImage" :alt="article.articleImage">
        </div>
        <div class="text-content">
          <router-link
            class="header-link"
            :to="article.articleId.toString()"
          >{{ article.articleHeader }}</router-link>
          <p class="ingress">{{ article.articleIngress }}</p>
          <p class="body">{{ article.articleBody }}</p>
        </div>
      </div>
      <div id="video-div" v-else>
        <router-link
            class="header-link"
            :to="article.articleId.toString()"
          >{{ article.articleHeader }}</router-link>
        <div>
          <iframe class="video" allowfullscreen="true" :src="article.articleVideo"></iframe>
        </div>
      </div>
      <div class="meta">
        <div class="author">{{ article.articleAuthor }}</div>
        <div class="spacer"></div>
        <div class="date">{{ article.articleDate }}</div>
      </div>
      <div class="divider" v-if="index !== $store.state.articles.length - 1"></div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchArticles')
  },
  name: 'NewsView'
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.articles {
  border-left: solid 1px #2c3e50;
  border-right: solid 1px #2c3e50;
  display: inline-block;
  width: 60vw;
  margin: auto;
}
.text-content {
  width: 50vw;
}
#video-div {
  margin-top: 10px;
}
.header-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.8em;
  font-weight: bold;
}
.image {
  margin-bottom: 15px;
  width: 30vw;
}
.video {
  width: 50vw;
  height: 50vh;
  margin: 20px;
}
.divider {
  border-top: solid 1px #2c3e50;
  width: 58vw;
  margin: auto;
}
@media (orientation: portrait) {
  .video,
  .articles {
    width: 90vw;
    margin: 0;
  }
  .image {
    width: 85vw;
    margin-top: 10px;
  }
  .text-content {
    width: 85vw;
  }
  .articles {
    margin: auto;
    border: none;
  }
  .divider {
    width: 88vw;
  }
}
</style>

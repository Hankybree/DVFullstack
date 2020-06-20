<template>
  <div class="content">
    <div class="articles" v-for="(article, index) in $store.state.articles" :key="index">
      <div v-if="article.articleType === 'article'">
        <img class="image" :src="article.articleImage" :alt="article.articleImage">
        <div class="text-content">
          <router-link
            class="header-link"
            :to="article.articleId.toString()"
          >{{ article.articleHeader }}</router-link>
          <p class="ingress">{{ article.articleIngress }}</p>
          <p class="body">{{ article.articleBody }}</p>
        </div>
      </div>
      <div v-else>
        <router-link
            class="header-link"
            :to="article.articleId.toString()"
          >{{ article.articleHeader }}</router-link>
        <iframe class="video" :src="article.articleVideo"></iframe>
      </div>
      <div class="meta">
        <div class="author">{{ article.articleAuthor }}</div>
        <div class="spacer"></div>
        <div class="date">{{ article.articleDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchData")
  },
  name: "NewsView",
  methods: {}
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
  border-bottom: solid 1px #2c3e50;
  display: inline-block;
  width: 100%;
  margin: auto;
}
.header-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.8em;
  font-weight: bold;
}
.image {
  margin-bottom: 15px;
}
.video {
  width: 98vw;
  height: 50vh;
}
.meta {
  width: 98vw;
}
/* @media (orientation: landscape) {
  .articles,
  .meta {
    width: 52vw;
  }
  .image,
  .video,
  .text-content {
    width: 50vw;
  }
}
@media (orientation: landscape) and (min-width: 700px) {
  .articles {
    width: 700px;
  }
  .meta {
    width: 670px;
  }
  .image,
  .video, 
  .text-content {
    width: 640px;
  }
} */
</style>

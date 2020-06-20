<template>
  <div class="content" v-if="$store.state.article !== null">
    <div id="article">
      <div v-if="$store.state.article.articleType === 'article'">
        <img class="image" :src="$store.state.article.img" :alt="$store.state.article.articleImage" />
        <h1>{{ $store.state.article.articleHeader }}</h1>
        <div class="text-content">
          <p>{{ $store.state.article.articleIngress }}</p>
          <p>{{ $store.state.article.articleBody }}</p>
        </div>
      </div>
      <div v-else>
        <h1>{{ $store.state.article.articleHeader }}</h1>
        <iframe class="video" :src="$store.state.article.articleVideo"></iframe>
      </div>
      <div class="meta">
        <div class="author">{{ $store.state.article.articleAuthor }}</div>
        <div class="spacer"></div>
        <div class="date">{{ $store.state.article.articleDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('fetchSingleArticle', this.$route.params.artikel)
  },
  name: "ArticleView"
}
</script>

<style scoped>
#article {
  width: 50vw;
  margin: auto;
}
.text-content {
  width: 50vw;
}
.video {
  width: 50vw;
  height: 50vh;
}
@media (orientation: portrait) {
  #article {
    width: 95vw;
  }
  .text-content {
    width: 90vw;
  }
  .video {
    width: 90vw;
  }
}
/* #article {
  width: 50vw;
  margin: auto;
}
.content {
  display: flex;
  flex-direction: column;
}
.meta {
  width: 45vw;
  display: inline-flex;
}
@media (orientation: portrait) {
  #article {
    width: 90vw;
    padding: 20px;
  }
  .text-content {
    width: 85vw;
    text-align: left;
  }
  .meta {
    width: 85vw;
  }
} */
</style>
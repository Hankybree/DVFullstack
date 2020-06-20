<template>
  <div class="content">
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
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.state.article === null) {
      for (let i = 0; i < this.$store.state.articles.length; i++) {
        if (
          this.$route.params.artikel ===
          this.$store.state.articles[i].articleId.toString()
        ) {
          this.$store.commit("setArticle", this.$store.state.articles[i])
          console.log(this.$store.state.article.articleVideo)
          break
        }
      }
    }
  },
  name: "ArticleView"
}
</script>

<style scoped>
.video {
  width: 80.5vw;
  height: 50vh;
}
.meta {
  width: 82.5vw;
  display: inline-flex;
}
</style>
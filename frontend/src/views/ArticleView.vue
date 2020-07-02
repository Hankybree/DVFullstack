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
    <div class="comments">
      <div class="fb-comments" :data-href="$store.state.commentUrl" data-numposts="5" data-width=""></div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('fetchSingleArticle', this.$route.params.artikel)
  },
  name: 'ArticleView'
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
.comments {
  background-color: white;
  padding: 20px;
  width: calc(50vw - 20px);
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: solid 0.5px rgba(0, 0, 0, 0.322);
  border-radius: 1em;
}
@media (orientation: portrait) {
  #article {
    width: 95vw;
  }
  .text-content,
  .video {
    width: 90vw;
  }
  .comments {
    width: calc(90vw - 20px);
  }
}
</style>
<template>
  <div class="content">
    <img class="image" :src="$store.state.article.img" :alt="$store.state.article.img" />
    <h1>{{ $store.state.article.header }}</h1>
    <div class="text-content">
      <p>{{ $store.state.article.ingress }}</p>
      <p>{{ $store.state.article.body }}</p>
    </div>
    <div class="meta">
      <div class="author">{{ $store.state.article.author }}</div>
      <div class="spacer"></div>
      <div class="date">{{ $store.state.article.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.state.article === null) {
      for (let i = 0; i < this.$store.state.articles.length; i++) {
        if (
          this.$route.params.artikel === this.$store.state.articles[i]._id
        ) {
          this.$store.state.article = this.$store.state.articles[i];
          break;
        }
      }
    }
  },
  name: "Artikel"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meta {
  width: 82.5vw;
  display: inline-flex;
}
</style>
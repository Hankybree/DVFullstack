<template>
  <div class="content">
    <div class="articles" v-for="(article, index) in $store.state.articles" :key="index">
      <div v-if="article.articleType === 'article'">
        <img class="image" :src="article.articleImage" :alt="article.articleImage">
        <div class="text-content">
          <router-link class="header-link" :to="article.articleId">{{ article.articleHeader }}</router-link>
          <p class="ingress">{{ article.articleIngress }}</p>
          <p class="body">{{ article.articleBody }}</p>
        </div>
      </div>
      <div v-else>
        <h2>{{ article.articleHeader }}</h2>
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
    this.fetchData()
  },
  name: "Nyheter",
  methods: {
    fetchData() {
      console.log("fetching data...");
      fetch("http://localhost:5000/artiklar/")
        .then(response => response.json())
        .then(result => {
          this.$store.state.articles = result;
          console.log("Fetch done");
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articles {
  border-left: solid 1px #2c3e50;
  border-right: solid 1px #2c3e50;
  border-bottom: solid 1px #2c3e50;
  display: inline-block;
  width: 100%;
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
  border: none;
  width: 98vw;
  height: 30vh;

}
@media (orientation: landscape) {
  .articles {
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
  .image,
  .video
  .text-content {
    width: 640px;
  }
}
</style>

<template>
  <div class="content">
    <div id="article" v-if="$store.state.article !== null">
      <div v-if="$store.state.article.articleType === 'article'">
        <img class="image" :src="$store.state.article.articleImage" :alt="$store.state.article.articleImage" />
        <h1>{{ $store.state.article.articleHeader }}</h1>
        <div class="text-content">
          <p class="ingress">{{ $store.state.article.articleIngress }}</p>
          <p>{{ $store.state.article.articleBody }}</p>
        </div>
      </div>
      <div v-else>
        <h1>{{ $store.state.article.articleHeader }}</h1>
        <iframe class="video" allowfullscreen="true" :src="$store.state.article.articleVideo"></iframe>
      </div>
      <div class="meta">
        <div class="author">Publicerad:</div>
        <div class="spacer"></div>
        <div class="date">{{ $store.state.article.articleDate }} av {{ $store.state.article.articleAuthor }}</div>
      </div>
      <div class="meta" v-if="$store.state.article.articleUpdatedTime">
        <div class="author">Senast uppdaterad:</div>
        <div class="spacer"></div>
        <div class="date">{{ $store.state.article.articleUpdatedTime }} av {{ $store.state.article.articleUpdatedBy }} </div>
      </div>
    </div>
    <div class="comments"></div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("fetchSingleArticle", this.$route.params.artikel)
  },
  mounted() {
    this.$nextTick(() => {
        this.loadComments()
    })
  },
  name: "ArticleView",
  methods: {
    loadComments() {
        let commentBox = document.createElement("div")

        commentBox.setAttribute("class", "fb-comments")
        commentBox.setAttribute("data-href", window.location.href)
        commentBox.setAttribute("data-numposts", 5)
        commentBox.setAttribute("data-width", "")
        document.querySelector(".comments").appendChild(commentBox)

        window.FB.XFBML.parse()
    }
  }
}
</script>

<style scoped>
#article {
  width: 50vw;
  margin: auto;
}
.image,
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
  .image,
  .text-content,
  .video {
    width: 90vw;
  }
  .comments {
    width: calc(90vw - 20px);
  }
}
</style>
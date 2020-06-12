<template>
  <div class="content">
    <div class="articles" v-for="(article, index) in $store.state.articles" :key="index">
      <div v-if="article.type === 'article'">
        <img class="image" :src="article.img" :alt="article.img">
        <div class="text-content">
          <router-link class="header-link" :to="article._id">{{ article.header }}</router-link>
          <p class="ingress">{{ article.ingress }}</p>
          <p class="body">{{ article.body }}</p>
        </div>
      </div>
      <div v-else>
        <h2>{{ article.header }}</h2>
        <youtube :video-id="article.videoId" :player-width="youtubeWidth" :playerHeight="youtubeHeight"></youtube>
      </div>
      <div class="meta">
        <div class="author">{{ article.author }}</div>
        <div class="spacer"></div>
        <div class="date">{{ article.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nyheter',
  computed: {
    youtubeWidth: {
      get() {
        if(screen.width >= 700) {
          return 640
        }
        return 240
      }
    },
    youtubeHeight: {
      get() {
        if(screen.width >= 700) {
          return 360
        }
        return 135
      }
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
@media (orientation: landscape) {
  .articles {
    width: 52vw;
  }
  .image, .text-content {
    width: 50vw;
  }
}
@media (orientation: landscape) and (min-width: 700px) {
  .articles {
    width: 700px;
  }
  .image, .text-content {
    width: 640px;
  }
}
</style>

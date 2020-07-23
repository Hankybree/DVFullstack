<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Logo">
      <div id="spacer"></div>
      <div id="logout" v-if="$store.state.loggedIn">
        <input type="button" value="Logga ut" @click="logout()">
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.commit('setLoggedIn', false)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 100vw;
}
body,
html {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  background-color: wheat;
  font-family: Arial, Helvetica, sans-serif;
}
header {
  background-color: pink;
  padding-top: 1em;
  height: 22vh;
  border-bottom: solid 3vh black;
  display: flex;
  flex-direction: row;
}
header > img {
  margin: 0 20px;
  height: 128px;
  width: 128px;
}
#spacer {
  flex-grow: 1;
}
#logout {
  margin: auto 10vw;
}
#links {
  background-color: black;
  margin-top: 1em;
  display: flex;
  height: 3vh;
}
#links > a {
  text-decoration: none;
  color: white;
  font-family: bangers;
  font-size: 1.5em;
  flex-grow: 1;
  text-align: center;
}
.content {
  text-align: center;
}

/* Articles */
.image {
  margin-top: 15px;
}
.image,
.text-content {
  width: 80vw;
}
.video {
  border: none;
}
.text-content {
  display: inline-block;
  text-align: left;
  padding: 2.5vw;
}
.ingress {
  font-weight: bold;
}
.meta {
  display: flex;
  font-size: 12px;
  margin-bottom: 6px;
  margin: auto;
}
.spacer {
  flex-grow: 1;
}
.author {
  text-align: left;
  margin-left: 1vw;
}
.date {
  text-align: right;
  margin-right: 1vw;
}
</style>

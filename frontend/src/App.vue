<template>
  <div id="app">
    <header>
      <img src="./assets/images/logo.png" alt="Logo">
      <nav id="links">
        <router-link to="/">Nyheter</router-link>
        <router-link to="/om">Om</router-link>
        <router-link to="/kontakt">Kontakt</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body, html {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  background-color: wheat;
  font-family: Arial, Helvetica, sans-serif;
}
header {
  background-color: pink;
  padding-top: 1em;
}
header > img {
  margin: 0 20px;
  height: 128px;
  width: 128px;
}
#links {
  background-color: black;
  margin-top: 1em;
  display: flex;
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
.image, .text-content {
  width: 80vw;
}
.video {
  border: none;
}
.text-content {
  display: inline-block;
  text-align: left;
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
@font-face {
  font-family: "bangers";
  src: url("./assets/fonts/bangers.ttf");
}
</style>
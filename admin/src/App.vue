<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Logo" />
      <div id="spacer"></div>
      <div id="logout" v-if="$store.state.loggedIn">
        {{ $store.state.userName }}
        <input type="button" value="Logga ut" @click="$store.dispatch('logout')" />
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
input[type="button"],
input[type="submit"] {
  width: 10vw;
  margin: 8px auto;
  border-radius: 1em;
  border: solid 0.5px black;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
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
</style>

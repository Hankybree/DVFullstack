<template>
    <div class="content">
        <div id="form">
            <input v-model="userName" type="text" placeholder="Användarnamn...">
            <input v-model="password" type="password" placeholder="Lösenord...">
            <input type="button" value="Logga in" @click="login()">
        </div>
    </div>
</template>

<script>
import { computed } from '../scripts/computed.js'
export default {
    name: 'LogIn',
    computed: computed,
    methods: {
        login() {
            console.log('Username: ' + this.userName + ' and password: ' + this.password)
            this.$store.commit('setLoggedIn', true)
        }
    }
}
</script>

<style scoped>
    .content {
        display: flex;
        min-height: 70vh;
    }
    #form {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 30vw;
    }
    input {
        border-radius: 1em;
    }
    input[type="text"],
    input[type="password"] {
        margin: 2px;
        height: 3vh;
        padding: 5px;
        border: solid 0.5px black;
    }
    @media (orientation: portrait) {
        #form,
        .type-div,
        select,
        input[type="button"] {
            width: 95vw;
        }
    }
</style>
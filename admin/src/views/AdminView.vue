<template>
    <div class="content">
        <div v-if="$store.state.loggedIn">
            <Post></Post>
        </div>

        <div v-else>
            <LogIn></LogIn>
        </div>
    </div>
</template>

<script>
import LogIn from '../components/LogIn.vue'
import Post from '../components/Post.vue'

export default {
    name: 'AdminView',
    components: {
        LogIn,
        Post
    }
}
</script>

<style scoped>

</style>
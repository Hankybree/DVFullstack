<template>
    <div class="content">
        <div v-if="$store.state.loggedIn">
            <input type="button" value="Skapa ny artikel" @click="openPostUI">
            <input type="button" value="Redigera" @click="openEditUI">

            <div v-if="$store.state.isPosting">
                <Post></Post>
            </div>
            <div v-else>
                <Edit></Edit>
            </div>
        </div>

        <div v-else>
            <LogIn></LogIn>
        </div>
    </div>
</template>

<script>
import LogIn from '../components/LogIn.vue'
import Post from '../components/Post.vue'
import Edit from '../components/Edit.vue'

export default {
    name: 'AdminView',
    components: {
        LogIn,
        Post,
        Edit
    },
    methods: {
        openPostUI() {
            this.$store.dispatch('defaultArticleData')
            this.$store.commit('setIsPosting', true)
        },
        openEditUI() {
            this.$store.commit('setIsPosting', false)
        }
    }
}
</script>

<style scoped>

</style>
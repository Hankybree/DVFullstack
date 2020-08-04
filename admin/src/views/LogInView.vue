<template>
    <div class="content">
        <div v-if="!$store.state.loggedIn">
            <LogIn></LogIn>
        </div>
    </div>
</template>

<script>
import LogIn from '../components/LogIn.vue'

export default {
    name: 'LogInView',
    components: {
        LogIn,
    }
}
</script>

<style scoped>
    .toggle-ui-button {
        margin: 5px;
    }
</style>
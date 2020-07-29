<template>
    <div class="content">
        <div :key="index" v-for="(article, index) in $store.state.articles">
            {{ article.articleId }} {{ article.articleHeader }}
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('getArticles')
    },
    name: 'Edit'
}
</script>

<style scoped>

</style>
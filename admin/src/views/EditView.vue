<template>
    <div class="content" v-if="$store.state.loggedIn">
        <div id="articles">
            <div :key="index" v-for="(article, index) in $store.state.articles">
                <p @click="focusArticle(article.articleId)">
                    {{ article.articleId }} {{ article.articleHeader }}
                </p>
            </div>
        </div>
        <div id="chosen-article">
            <ChosenArticle></ChosenArticle>
        </div>
    </div>
</template>

<script>
import ChosenArticle from '../components/ChosenArticle.vue'

export default {
    beforeCreate() {
        this.$store.dispatch('getArticles')
    },
    name: 'EditView',
    components: {
        ChosenArticle
    },
    methods: {
        focusArticle(id) {
            this.$store.commit('setArticleId', id)
            this.$store.dispatch('getArticle')
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
}
#articles {
    width: 30vw;
}
#chosen-article {
    width: 70vw;
    border-left: solid 0.5px black;
}
</style>
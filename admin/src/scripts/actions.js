export const actions = {
    getArticles(context) {
        fetch('http://localhost:5000/artiklar')
            .then(response => response.json())
            .then(result => {
                context.commit('setArticles', result)
            })
    },
    getArticle(context) {
        fetch('http://localhost:5000/artiklar/' + context.state.articleId)
            .then(response => response.json())
            .then(result => {
                context.commit('setArticleType', result.articleType)
                context.commit('setArticleImage', result.articleImage)
                context.commit('setArticleVideo', result.articleVideo)
                context.commit('setArticleHeader', result.articleHeader)
                context.commit('setArticleIngress', result.articleIngress)
                context.commit('setArticleBody', result.articleBody)
                context.commit('setArticleAuthor', result.articleAuthor)
            })
    },
    defaultArticleData(context) {
        context.commit('setArticleType', 'article')
        context.commit('setArticleImage', '')
        context.commit('setArticleVideo', '')
        context.commit('setArticleHeader', '')
        context.commit('setArticleIngress', '')
        context.commit('setArticleBody', '')
        context.commit('setArticleAuthor', context.state.userName)
    }
}
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
        context.commit('setArticleId', -1)
        context.commit('setArticleType', 'article')
        context.commit('setArticleImage', '')
        context.commit('setArticleVideo', '')
        context.commit('setArticleHeader', '')
        context.commit('setArticleIngress', '')
        context.commit('setArticleBody', '')
        context.commit('setArticleAuthor', context.state.userName)
    },
    postArticle(context) {
        console.log(context)
    },
    patchArticle(context) {
        console.log(context)
    },
    deleteArticle(context) {
        console.log(context)
    },
    login(context) {
        fetch('http://localhost:5000/login', {
            body: JSON.stringify({
                userName: context.state.userName,
                userPassword: context.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json())
        .then(result => {

            if (result.status === 1) {
                localStorage.setItem('token', result.token)
                context.commit('setLoggedIn', true)
            }

            alert(result.message)
        })
    },
    logout(context) {
        fetch('http://localhost:5000/logout', {
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'DELETE'
        }).then(response => response.json())
        .then(result => {

            if (result.status === 1) {
                localStorage.removeItem('token')
                context.commit('setLoggedIn', false)
                context.commit('setUserName', '')
                context.commit('setPassword', '')
            }
            
            alert(result.message)
        })
    }
}
export const actions = {
    getArticles(context) {
        fetch('http://dagensvibe.se:5000/artiklar')
            .then(response => response.json())
            .then(result => {
                context.commit('setArticles', result)
            })
    },
    getArticle(context) {
        fetch('http://dagensvibe.se:5000/artiklar/' + context.state.articleId)
            .then(response => response.json())
            .then(result => {
                context.commit('setArticleType', result.articleType)
                context.commit('setArticleImage', result.articleImage)
                if (result.articleVideo !== null) {
                const videoId = result.articleVideo.replace('https://www.youtube.com/embed/', '')
                context.commit('setArticleVideo', videoId)
                }
                context.commit('setArticleHeader', result.articleHeader)
                context.commit('setArticleIngress', result.articleIngress)
                context.commit('setArticleBody', result.articleBody)
                context.commit('setArticleAuthor', result.articleAuthor)

                context.commit('setImageUrl', result.articleImage)
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

        // Create form data
        let formData = new FormData()

        formData.append('articleType', context.state.articleType)
        formData.append('articleHeader', context.state.articleHeader)

        if (context.state.articleType === 'article') {
            formData.append('articleImage', document.querySelector('#article-image-post').files[0])
            formData.append('articleIngress', context.state.articleIngress)
            formData.append('articleBody', context.state.articleBody)
        } else {
            formData.append('articleVideo', context.state.articleVideo)
        }
        
        formData.append('articleAuthor', context.state.articleAuthor)

        console.log(formData)

        // Send post request
        fetch('http://dagensvibe.se:5000/artiklar', {
            body: formData,
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'POST'
        }).then(response => response.json())
        .then(result => {
            alert(result.message)

            if (result.status === 1) {
                window.location.reload()
            }
        })
    },
    patchArticle(context) {

        let formData = new FormData()

        formData.append('articleType', context.state.articleType)
        formData.append('articleHeader', context.state.articleHeader)

        if (context.state.articleType === 'article') {
            formData.append('articleImage', document.querySelector('#article-image-patch').files[0])
            formData.append('articleIngress', context.state.articleIngress)
            formData.append('articleBody', context.state.articleBody)
        } else {
            formData.append('articleVideo', context.state.articleVideo)
        }
        
        formData.append('articleUpdatedBy', context.state.articleAuthor)

        // Send patch request
        fetch('http://dagensvibe.se:5000/artiklar/' + context.state.articleId, {
            body: formData,
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(response => response.json())
        .then(result => {
            alert(result.message)

            if (result.status === 1) {
                window.location.reload()
            }
        })
    },
    deleteArticle(context) {
        fetch('http://dagensvibe.se:5000/artiklar/' + context.state.articleId, {
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'DELETE'
        }).then(response => response.json())
        .then(result => {
            alert(result.message)
            window.location.reload()
        })
    },
    login(context) {
        fetch('http://dagensvibe.se:5000/login', {
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
                context.commit('setArticleAuthor', context.state.userName)
            }

            alert(result.message)
            window.location.replace('http://localhost:8080/#/publicera')
        })
    },
    logout(context) {
        fetch('http://dagensvibe.se:5000/logout', {
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
            window.location.replace('http://localhost:8080/#/')
        })
    },
    getSession(context) {
        fetch('http://dagensvibe.se:5000/session', {
            headers: {
                'Token': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    context.commit('setUserName', result.userName)
                    context.commit('setLoggedIn', true)
                    context.commit('setArticleAuthor', result.userName)
                } else {
                    alert(result.message)
                }
            })
    }
}
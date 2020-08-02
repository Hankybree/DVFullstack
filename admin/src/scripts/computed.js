export const computed = {
    userName: {
        get() {
            return this.$store.state.userName
        },
        set(newUserName) {
            this.$store.commit('setUserName', newUserName)
        }
    },
    password: {
        get() {
            return this.$store.state.password
        },
        set(newPassword) {
            this.$store.commit('setPassword', newPassword)
        }
    },
    articleId: {
        get() {
            return this.$store.state.articleId
        },
        set(newArticleId) {
            this.$store.commit('setArticleId', newArticleId)
        }
    },
    articleType: {
        get() {
            return this.$store.state.articleType
        },
        set(newArticleType) {
            this.$store.commit('setArticleType', newArticleType)
        }
    },
    articleImage: {
        get() {
            return this.$store.state.articleImage
        },
        set(newArticleImage) {
            this.$store.commit('setArticleImage', newArticleImage)
        }
    },
    articleVideo: {
        get() {
            return this.$store.state.articleVideo
        },
        set(newArticleVideo) {
            this.$store.commit('setArticleVideo', newArticleVideo)
        }
    },
    articleHeader: {
        get() {
            return this.$store.state.articleHeader
        },
        set(newArticleHeader) {
            this.$store.commit('setArticleHeader', newArticleHeader)
        }
    },
    articleIngress: {
        get() {
            return this.$store.state.articleIngress
        },
        set(newArticleIngress) {
            this.$store.commit('setArticleIngress', newArticleIngress)
        }
    },
    articleBody: {
        get() {
            return this.$store.state.articleBody
        },
        set(newArticleBody) {
            this.$store.commit('setArticleBody', newArticleBody)
        }
    },
    articleAuthor: {
        get() {
            return this.$store.state.articleAuthor
        },
        set(newArticleAuthor) {
            this.$store.commit('setArticleAuthor', newArticleAuthor)
        }
    },
}
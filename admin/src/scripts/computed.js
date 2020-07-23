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
    articleType: {
        get() {
            return this.$store.state.articleType
        },
        set(newArticleType) {
            this.$store.commit('setPassword', newArticleType)
        }
    },
    articleImage: {
        get() {
            return this.$store.state.articleImage
        },
        set(newArticleImage) {
            this.$store.commit('setPassword', newArticleImage)
        }
    },
    articleVideo: {
        get() {
            return this.$store.state.articleVideo
        },
        set(newArticleVideo) {
            this.$store.commit('setPassword', newArticleVideo)
        }
    },
    articleHeader: {
        get() {
            return this.$store.state.articleHeader
        },
        set(newArticleHeader) {
            this.$store.commit('setPassword', newArticleHeader)
        }
    },
    articleIngress: {
        get() {
            return this.$store.state.articleIngress
        },
        set(newArticleIngress) {
            this.$store.commit('setPassword', newArticleIngress)
        }
    },
    articleBody: {
        get() {
            return this.$store.state.articleBody
        },
        set(newArticleBody) {
            this.$store.commit('setPassword', newArticleBody)
        }
    },
    articleAuthor: {
        get() {
            return this.$store.state.articleAuthor
        },
        set(newArticleAuthor) {
            this.$store.commit('setPassword', newArticleAuthor)
        }
    },
}
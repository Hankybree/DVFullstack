export const actions = {
    getArticles(context) {
        fetch('http://localhost:5000/artiklar')
            .then(response => response.json())
            .then(result => {
                context.commit('setArticles', result)
                console.log(result)
            })
    }
}
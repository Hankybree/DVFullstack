export const actions = {
    fetchArticles(context) {
        console.log("Fetching data...");
        fetch("http://localhost:5000/artiklar/")
          .then(response => response.json())
          .then(result => {
            context.commit('setArticles', result)
            console.log("Fetch done!");
          })
    },
    fetchSingleArticle(context, id) {
      console.log('Fetching data...')
      fetch('http://localhost:5000/artiklar/' + id)
        .then(response => response.json())
        .then(result => {
          context.commit('setArticle', result)
          console.log('Fetch done!')
        })
    }
}
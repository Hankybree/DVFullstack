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
    },
    sendMail() {
      fetch('http://localhost:5000/kontakta', {
        body: JSON.stringify({
          subject: document.querySelector('#mail-subject').value,
          mail: document.querySelector('#mail-mail').value,
          body: document.querySelector('#mail-body').value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(response => response.json())
      .then(result => {
        document.querySelector('#mail-subject').value = ''
        document.querySelector('#mail-mail').value = ''
        document.querySelector('#mail-body').value = ''
        alert(result.message)
      })
    }
}
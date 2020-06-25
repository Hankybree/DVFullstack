export const actions = {
  fetchArticles(context) {

    console.log("Fetching data...")

    fetch("http://localhost:5000/artiklar/")
      .then(response => response.json())
      .then(result => {

        if (result.status === 2) {
          alert(result.message)
        } else {
          context.commit('setArticles', result)
          console.log("Fetch done!")
        }
      })
  },
  fetchSingleArticle(context, id) {

    console.log('Fetching data...')

    fetch('http://localhost:5000/artiklar/' + id)
      .then(response => response.json())
      .then(result => {

        if (result.status === 2) {
          alert(result.message)
        } else {
          context.commit('setArticle', result)
          console.log('Fetch done!')
        }
      })
  },
  sendMail() {

    const subject = document.querySelector('#mail-subject')
    const mail = document.querySelector('#mail-mail')
    const body = document.querySelector('#mail-body')

    if (subject.checkValidity() && mail.checkValidity() && body.checkValidity()) {
      fetch('http://localhost:5000/kontakta', {
      body: JSON.stringify({
        subject: subject.value,
        mail: mail.value,
        body: body.value
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
    } else {
      alert('Fyll i alla fält')
    }
  }
}
<template>
  <div class="content">
    <h1>Vill du ge oss ett tips, ställa en fråga eller göra en felanmälan?</h1>
    <h3>Fyll i formuläret så kontaktar vi dig!</h3>
    <form id="question-form">
      <input id="mail-subject" type="text" placeholder="Ämne..." required>
      <input id="mail-mail" type="email" placeholder="E-post..." required>
      <textarea id="mail-body" placeholder="Meddelande..." cols="30" rows="10" required></textarea>
      <input type="submit" value="Skicka" @click.prevent="$store.dispatch('sendMail')">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactView'
}
</script>

<style scoped>
.content {
  padding-top: 20px;
}
#question-form {
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
}
#question-form > input,
#question-form > textarea {
  border: solid 0.5px rgba(0, 0, 0, 0.315);
  border-radius: 1em;
  outline: none;
}
#question-form > input[type="text"],
#question-form > input[type="email"],
#question-form > textarea {
  padding: 20px;
}
input[type="submit"] {
  margin: 10px;
  height: 2em;
}
::placeholder {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
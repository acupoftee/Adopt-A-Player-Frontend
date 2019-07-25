const api = require('./api.js')
// const ui = require('./ui.js')

const onGetUsers = (event) => {
  event.preventDefault()
  api.getUsers()
    .then(console.log)
    .catch(console.error)
}
const addHandlers = () => {
  $('#getPlayers').on('click', onGetUsers)
}
module.exports = {
  addHandlers
}
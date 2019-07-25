const store = require('../../store')
const utils = require('../../util/utils')

const signUpSuccessful = () => {
  // hide error message if it's active on success
  if ($('.sign-up-error').hasClass('active')) {
    utils.hideItems('.sign-up-error')
  }
  // close sign up modal
  $('#signUpModal').modal('hide')

  // clear form
  $('form').trigger('reset')
}

const signUpFailure = () => {
  // clear form
  $('form').trigger('reset')

  // show error message
  utils.showItems('.sign-up-error')
}

const signInSuccessful = responseData => {
  // hide error message if active on success
  if ($('.sign-up-error').hasClass('active')) {
    utils.hideItems('.sign-in-error')
  }
  // update the user's session info for later
  store.user = responseData.user

  // close sign in modal
  $('#signInModal').modal('hide')

  // Hide sign up text
  utils.hideItems('#login-tab')
  utils.hideItems('#sign-up-tab')

  // show sign in text
  utils.showItems('#logout-tab')
  utils.showItems('#getHeroRoster')
  utils.showItems('#getPlayers')
  utils.showItems('#updateProfile')

  utils.hideItems('.homePageSignUp')
  utils.hideItems('.intro-footer')

  // clear form
  $('form').trigger('reset')
}

const signInFailure = () => {
  $('form').trigger('reset')
  utils.showItems('.sign-in-error')
}

const signOutSuccessful = () => {
  // show sign up text
  utils.showItems('#login-tab')
  utils.showItems('#sign-up-tab')

  // Hide options for signed in users
  utils.hideItems('#updateProfile')
  utils.hideItems('#logout-tab')
  utils.hideItems('#getHeroRoster')
  utils.hideItems('#getPlayers')

  $('.hero-list').empty()

  utils.showItems('.homePageSignUp')
  utils.showItems('.intro-footer')
}

const signOutFailure = () => {

}

module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  signOutSuccessful,
  signOutFailure
}

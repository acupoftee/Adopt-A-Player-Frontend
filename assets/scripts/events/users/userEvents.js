const _ = require('underscore')
const getFormFields = require('../../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const store = require('../../store')
const heroIds = require('../heroes/getHeroIds')
const utils = require('../../util/utils')

const onGetUsers = event => {
  event.preventDefault()
  api.getUsers()
    .then(ui.getProfilesSuccess)
    .catch(console.error)
}

// const onEditProfile = event => {
//   event.preventDefault()
//   const form = event.target
//   const formData = getFormFields(form)
//   api.updateProfile(formData)
//     .then(console.log)
//     .catch(console.error)
// }

const onClickProfileTab = () => {
  // the user's data and general join table data is saved in a general object
  // This is going to be passed into our profile handlebars file
  const data = {}

  // get the user profile, and then add their info into data
  api.getUserProfile()
    .then(res => {
      data.user = res
    })
    .catch(console.error)

  // 1. get all the join table data
  // 2. share the profile and join table info to handlebars
  api.getUserHeroJoins()
    .then(res => {
      data.joins = res
    })
    .then(() => {
      ui.getProfileSuccess(data)
    })
    .catch(console.error)
}

const onUpdateProfile = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.updateProfile(formData)
    .then(console.log)
    .catch(console.error)
  $('.modal').modal('hide')
  ui.updateProfileView(formData)
}

const onUpdateVideo = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const video = utils.removeBlanks(formData.video)
  const reqData = {
    video
  }
  api.updateVideo(reqData)
    .then(console.log)
    .catch(console.error)
}

const onAddVideo = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  formData.video.user_id = store.user.id
  api.addVideo(formData)
    .then(console.log)
    .catch(console.error)
}

const onAddHero = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const heroId = (_.invert(heroIds))[formData.hero.name]

  const userHero = {
    user_hero: {
      hero_id: heroId,
      user_id: store.user.id
    }
  }
  api.addUserHero(userHero)
    .then(console.log)
    .catch(console.error)

  $('#addHeroModal').modal('hide')
}

const onDeleteVideo = event => {
  event.preventDefault()
  const videoId = store.videoId
  console.log(videoId)
  api.deleteVideo(videoId)
    .then(console.log)
    .catch(console.error)
  $('#deleteVideoPrompt').modal('hide')
}

const onDeleteHero = event => {
  event.preventDefault()
  const heroId = store.heroId
  api.deleteHero(heroId)
    .then(console.log)
    .catch(console.error)
  $('#deleteHeroPrompt').modal('hide')
}

const onOpenModals = event => {
  const $target = $(event.target)
  if ($target.hasClass('edit-display-name')) {
    $('#newDisplayName').modal('show')
    $('#display-name').on('submit', onUpdateProfile)
    $('#newDisplayName').modal('hide')
  } else if ($target.hasClass('edit-summary')) {
    $('#newSummary').modal('show')
    $('#summary').on('submit', onUpdateProfile)
    $('#newSummary').modal('hide')
  } else if ($target.hasClass('edit-platform')) {
    $('#newPlatform').modal('show')
    $('#platform').on('submit', onUpdateProfile)
    $('#newPlatform').modal('hide')
  } else if ($target.hasClass('edit-region')) {
    $('#newRegion').modal('show')
    $('#region').on('submit', onUpdateProfile)
    $('#newRegion').modal('hide')
  } else if ($target.hasClass('edit-skill-rating')) {
    $('#newSkillRating').modal('show')
    $('#skill-rating').on('submit', onUpdateProfile)
    $('#newSkillRating').modal('hide')
  } else if ($target.hasClass('edit-video')) {
    store.videoId = $target.data('id')
    $('#videoOptions').modal('show')
    $('#video-edit-option').on('click', openVideoOptions)
    $('#video-update').on('submit', onUpdateVideo)
    $('#video-delete-option').on('click', openVideoDeleteOptions)
  } else if ($target.hasClass('add-video-option')) {
    $('#addVideoModal').modal('show')
    $('#add-video').on('submit', onAddVideo)
  } else if ($target.hasClass('add-hero-option')) {
    $('#addHeroModal').modal('show')
    // https://stackoverflow.com/questions/2888446/get-the-selected-option-id-with-jquery
    $('#add-hero').on('submit', onAddHero)
  }
}

const openVideoOptions = event => {
  $('#editVideoModal').modal('show')
  $('#videoOptions').modal('hide')
}

const openVideoDeleteOptions = event => {
  $('#deleteVideoPrompt').modal('show')
  $('#videoOptions').modal('hide')
  $('#delete-video').on('click', onDeleteVideo)
}

const onOpenRemoveHeroPrompt = event => {
  store.heroId = $(event.target).data('id')
  $('#deleteHeroPrompt').modal('show')
  $('#delete-hero').on('click', onDeleteHero)
}

const addHandlers = () => {
  $('#getPlayers').on('click', onGetUsers)
  $('body').on('click', '.editable', onOpenModals)
  $('body').on('click', '.hero-profile-icon', onOpenRemoveHeroPrompt)
  $('body').on('click', '.profile-card', () => {
    console.log('clicked on a profile \\o/')
  })
}

module.exports = {
  addHandlers,
  // onEditProfile,
  onClickProfileTab,
  onUpdateProfile
}

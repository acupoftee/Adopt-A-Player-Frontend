const getFormFields = require('../../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')
const store = require('../../store')

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
  const data = {}
  api.getUserProfile()
    .then(res => {
      data.user = res
      return data
    })
    .catch(console.error)

  api.getUserHeroJoins()
    .then(res => {
      data.joins = res
      return data
    })
    .then(() => {
      ui.getProfileSuccess(data)
    })
    .catch(console.error)
}

// const onGetJoins = () => {
//   api.getUserHeroJoins()
//     .then(ui.getProfileSuccess)
//     .catch(console.error)
// }

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
  console.log(formData)
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
  console.log(heroId)
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
    $('#video-delete-option').on('click', openVideoDeleteOptions)
  } else if ($target.hasClass('add-video-option')) {
    $('#addVideoModal').modal('show')
    $('#add-video').on('submit', onAddVideo)
  } else if ($target.hasClass('add-hero-option')) {
    $('#addHeroModal').modal('show')
    $('#add-hero').on('click', onAddHero)
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
  // console.log('Clicked!')
  // pass the API the id of the join table entry
  // in rails, pass in the two foreign keys
  console.log(event.target)
  store.heroId = $(event.target).data('id')
  $('#deleteHeroPrompt').modal('show')
  $('#delete-hero').on('click', onDeleteHero)
}

const addHandlers = () => {
  $('#getPlayers').on('click', onGetUsers)
  $('body').on('click', '.editable', onOpenModals)
  $('body').on('click', '.hero-profile-icon', onOpenRemoveHeroPrompt)
}

module.exports = {
  addHandlers,
  // onEditProfile,
  onClickProfileTab,
  onUpdateProfile
}

window.addEventListener(
  'touchmove',
  e => {
    console.log('window scrolling')
    e.preventDefault()
  },
  { passive: false }
)

const modal = document.querySelector('.modal')

modal.addEventListener('touchmove', e => {
  console.log('modal scrolling')
  e.stopPropagation()
})

modal.addEventListener('scroll', () => {
  if (modal.scrollTop < 1) {
    modal.scrollTop = 1
  } else if (modal.scrollHeight - modal.scrollTop - modal.clientHeight < 1) {
    modal.scrollTop = modal.scrollTop - 1
  }
})

window.addEventListener(
  'touchmove',
  e => {
    console.log('window scrolling')
    e.preventDefault()
  },
  { passive: false }
)

document.querySelector('.modal').addEventListener('touchmove', e => {
  console.log('modal scrolling')
  e.stopPropagation()
})

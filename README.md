# Scroll Problem in iOS

### Problem 1: If the child element can be scrolled and we reaches to the top-most or bottom-most of that element, its parent element will be scrolled instead even our movement occurs inside the child element.

How to fix this:
https://stackoverflow.com/a/48385733

it seems iOS will only scroll the body once the overlay reaches min or max scrolling. So, set the scrollTop of the overlay to 1 instead of zero, and detect the onscroll event (which on iOS is fired after scrolling ends) and if at max (app.scrollHeight - app.scrollTop - app.clientHeight < 1) set it to one pixel shorter. For example

```javascript
var overlay = document.getElementById('overlay')

function onScroll() {
  if (overlay.scrollTop < 1) {
    overlay.scrollTop = 1
  } else if (overlay.scrollHeight - overlay.scrollTop - overlay.clientHeight < 1) {
    overlay.scrollTop = overlay.scrollTop - 1
  }
}

overlay.addEventListener('scroll', onScroll)
```

You might want to add a check and only attach the event if running in iOS.

### Problem 2: We want to disable scrolling on the parent element while allowing scrollling on the child element.

How to do this:
https://stackoverflow.com/a/18896991

```javascript
document.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault()
  },
  false
)
document.getElementById('inner-scroll').addEventListener(
  'touchmove',
  function(e) {
    e.stopPropagation()
  },
  false
)
```

The idea is that your main scroll is always (to your discretion) disabled, but in your inner-scroll you prevent the event from bubbling up (or propagating), so it will never reach the first event listener, which would ultimately cancel the touchmove event.

I hope this is what you were looking for. I've had a situation similar to yours, where the main scroll was disabled on tablet, but i wanted an inner scroll to work. This seemed to do the job.

### Problem 3: Momentum scrolling isn't enable on elements by default, it only enable on window, i.e. it works while scrolling the page but doesn't work while scrolling an element.

How to fix this:
Add these CSS into the element we want to enable momentum scrolling.

```css
overflow: scroll;
-webkit-overflow-scrolling: touch;
```

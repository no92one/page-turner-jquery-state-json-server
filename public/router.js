import shinyLight from "./shiny-light.js"
import platosCave from "./platos-cave.js"

function router() {
  switch (location.hash) {
    case "#shiny-light":
      $('main').html(shinyLight())
      break
    case "#platos-cave":
      $('main').html(platosCave())
      break
    default:
      $('main').html(`<h2><strong>404</strong> Good job! You've broken the internet.</h2>`)
  }
}

window.onhashchange = router
window.onload = router

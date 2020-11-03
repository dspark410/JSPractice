const mesgEl = document.getElementById('msg')

const randomNum = getRandomNumber()

console.log('Number: ', randomNum)

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

// Start recognition and game
recognition.start()

// Capture user speak
function onSpeak(e) {
  //console.log(e)
  const msg = e.results[0][0].transcript

  writeMessage(msg)
  checkNumber(msg)
}

// Write what user speaks
function writeMessage(msg) {
  mesgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `
}

// CHeck msg against number
function checkNumber(msg) {
  const num = +msg

  // Check if valid number
  if (Number.isNaN(num)) {
    mesgEl.innerHTML += '<div>That is not a valid number</div>'
    return
  }

  // Check in range
  if (num > 100 || num < 1) {
    mesgEl.innerHTML = '<div>Number must be between 1 and 100</div>'
    return
  }

  // Check Number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}
      </h2>
      <button class="play-again" id="play-again"Play Again</button>
      `
  } else if (num > randomNum) {
    mesgEl.innerHTML += `<div>GO LOWER</div>`
  } else {
    mesgEl.innerHTML += `<div>GO HIGHER</div>`
  }
}

// Generate Random number 1-100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

// Speak result
recognition.addEventListener('result', onSpeak)

// End SR service
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload()
  }
})



let stacks = {
  a: [],
  b: [],
  c: []
}
let moveCount = 0
let clickCount = 0
let startStack = ''
let endStack = ''
let pieceID = ''
let numberOfDiscs = 0

const getStartAndEnd = (clicked, id) => {
  console.log(stacks)
  if (clickCount === 0) {
    pieceID = $('#' + id).children().last()
    startStack = clicked
    pieceID.css('margin-top', '-120px')
    clickCount++
  }
  else if (clickCount === 1) {
    endStack = clicked
    towersOfHanoi(startStack, endStack, pieceID)
  }
}

const fillStacks = () => {
  resetGame()
  numberOfDiscs = Number(document.getElementById('discs').value)
  for (let i = 0; i < numberOfDiscs; i++) {
    stacks.a.unshift(i + 1)
    console.log('disc' + ((numberOfDiscs - i)))
    $('.linea').append("<li id='disc" + ((numberOfDiscs - i)) + "' value='" + ((numberOfDiscs - i) + 2) + "'></li>")
  }
  document.getElementById('play').innerHTML = 'Reset'
}

const resetGame = () => {
  moveCount = 0
  clickCount = 0
  $('li').remove()
  stacks = {
    a: [],
    b: [],
    c: []
  }
  document.getElementById('updates').innerHTML = 'Good luck!'
  document.getElementById('counter').innerHTML = 'moves: ' + moveCount
}


const movePiece = (startStack, endStack, pieceID) => {
  let destinationStack = $('.line' + endStack)
  destinationStack.append(pieceID)
  pieceID.css('margin-top', '-40px')
  stacks[endStack].push(stacks[startStack].pop())
}



const isLegal = (startStack, endStack, pieceID) => {

  let start = stacks[startStack][stacks[startStack].length - 1]
  let end = stacks[endStack][stacks[endStack].length - 1]
  if (start < end || stacks[endStack].length === 0) {
    moveCount++
    document.getElementById('counter').innerHTML = 'moves: ' + moveCount
    document.getElementById('updates').innerHTML = 'Disc moved to tower ' + endStack.toUpperCase() + '.'
    clickCount--
    return true
  }
  else {
    document.getElementById('updates').innerHTML = 'Think before you move...'
    clickCount--
    pieceID.css('margin-top', '-40px')
    return false
  }
}


const checkForWin = () => {
  if (stacks.b.length === numberOfDiscs) {
    if (numberOfDiscs === 8) {
      document.getElementById('updates').innerHTML = 'You win! 8 is quite enough, do something else now.'
    } else {
      document.getElementById('updates').innerHTML = 'You win! Try the next level!'
    }
    return true
  }
  else {
    return false
  }
}

const towersOfHanoi = (startStack, endStack, pieceID) => {
  if (isLegal(startStack, endStack, pieceID)) {
    movePiece(startStack, endStack, pieceID)
    checkForWin()
  }

}

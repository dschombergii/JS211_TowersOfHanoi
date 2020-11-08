'use strict'

// const assert = require('assert')
// const readline = require('readline')
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// An object that represents the three stacks of Towers of Hanoi 
// * each key is an array of Numbers: 
// * A is the far-left, 
// * B is the middle, 
// * C is the far-right stack
// * Each number represents the largest to smallest tokens: 
// * 4 is the largest, 
// * 1 is the smallest

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
    console.log(clickCount)
    pieceID = $('#' + id).children().last()
    startStack = clicked
    pieceID.css('margin-top', '-120px')
    console.log($('#' + id).children().last())
    console.log(startStack)
    clickCount++
  }
  else if (clickCount === 1) {
    console.log(clickCount)
    endStack = clicked
    console.log(endStack)
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
  console.log(stacks.a)
  console.log(numberOfDiscs)
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

// Start here. What is this function doing?
const printStacks = () => {
  console.log('a: ' + stacks.a)
  console.log('b: ' + stacks.b)
  console.log('c: ' + stacks.c)
}


// Next, what do you think this function should do?
const movePiece = (startStack, endStack, pieceID) => {
  console.log(pieceID)
  let destinationStack = $('.line' + endStack)
  destinationStack.append(pieceID)
  pieceID.css('margin-top', '-40px')
  stacks[endStack].push(stacks[startStack].pop())
}



// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack, pieceID) => {

  let start = stacks[startStack][stacks[startStack].length - 1]
  let end = stacks[endStack][stacks[endStack].length - 1]
  if (start < end || stacks[endStack].length === 0) {
    console.log('is legal')
    moveCount++
    document.getElementById('counter').innerHTML = 'moves: ' + moveCount
    document.getElementById('updates').innerHTML = 'Disc moved to tower ' + endStack.toUpperCase() + '.'
    clickCount--
    return true
  }
  else {
    console.log('Input not allowed, please try again...')
    document.getElementById('updates').innerHTML = 'Think before you move...'
    clickCount--
    pieceID.css('margin-top', '-40px')
    return false
  }
}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if (stacks.c.length === numberOfDiscs) {
    console.log('You win!')
    if (numberOfDiscs === 7) {
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

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack, pieceID) => {
  console.log(startStack, endStack)
  if (isLegal(startStack, endStack, pieceID)) {
    movePiece(startStack, endStack, pieceID)
    checkForWin()
    console.log(stacks)
    console.log(Number(numberOfDiscs))
  }

}

// const getPrompt = () => {
//   printStacks()
//   rl.question('start stack: ', (startStack) => {
//     rl.question('end stack: ', (endStack) => {
//       towersOfHanoi(startStack, endStack)
//       getPrompt()
//     })
//   })
// }

// // Tests

// if (typeof describe === 'function') {

//   describe('#towersOfHanoi()', () => {
//     it('should be able to move a block', () => {
//       towersOfHanoi('a', 'b')
//       assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] })
//     })
//   })

//   describe('#isLegal()', () => {
//     it('should not allow an illegal move', () => {
//       stacks = {
//         a: [4, 3, 2],
//         b: [1],
//         c: []
//       }
//       assert.equal(isLegal('a', 'b'), false)
//     })
//     it('should allow a legal move', () => {
//       stacks = {
//         a: [4, 3, 2, 1],
//         b: [],
//         c: []
//       }
//       assert.equal(isLegal('a', 'c'), true)
//     })
//   })
//   describe('#checkForWin()', () => {
//     it('should detect a win', () => {
//       stacks = { a: [], b: [4, 3, 2, 1], c: [] }
//       assert.equal(checkForWin(), true)
//       stacks = { a: [1], b: [4, 3, 2], c: [] }
//       assert.equal(checkForWin(), false)
//     })
//   })

// } else {

//   getPrompt()

// }

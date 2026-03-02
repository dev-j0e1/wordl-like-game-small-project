let largeTextFileURL = "https://apiacoa.org/publications/teaching/datasets/google-10000-english.txt"
let afterDarkURL = "https://www.cs.cmu.edu/~biglou/resources/bad-words.txt"

// AI generated slop words until I can figure out how to do the .fetch on a word file...
let theList = [
  "sky",    // 3
  "book",   // 4
  "apple",  // 5
  "stamp",  // 5
  "red",    // 3
  "cloud",  // 5
  "frog",   // 4
  "drink",  // 5
  "stone",  // 5
  "joy",    // 3
  "dance",  // 5
  "milk",   // 4
  "track",  // 5
  "leaf",   // 4
  "crane",  // 5
  "pitch",  // 5
  "fly",    // 3
  "great",  // 5
  "note",   // 4
  "mouse",  // 5
  "wide",   // 4
  "grass",  // 5
  "chip",   // 4
  "pond",   // 4
  "fire",   // 4
  "hat",    // 3
  "vision", // 6
  "march",  // 5
  "field",  // 5
  "drum",   // 4
  "wave",   // 4
  "lizard", // 6
  "beam",   // 4
  "golf",   // 4
  "night",  // 5
  "team",   // 4
  "breeze", // 6
  "palm",   // 4
  "quick",  // 5
  "joyful", // 6
  "tide",   // 4
  "spark",  // 5
  "arch",   // 4
  "shine",  // 5
  "ramp",   // 4
  "ocean",  // 5
  "vibe",   // 4
  "crown",  // 5
  "pet",    // 3
  "blend"   // 5
];



function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function createTile(letter) {
    let letterTile = document.createElement("div")  
    letterTile.innerText = letter ?? ""
    letterTile.classList.add("letter-tile")
    return letterTile
}

function createRow(numberOfLetters) {
    let newRow = document.createElement("div")
    newRow.classList.add("word-row")
    for (let i = 0; i<numberOfLetters; i++) {
        newRow.append(createTile())
    }
    return newRow
}

function renderWordToContainer(word, numberOfGuesses) {
    let wordlContainer = document.querySelector("#grid-container")
    for (let i = 0; i<numberOfGuesses; i++) {
        wordlContainer.append(createRow(word.length))
    }

}

class Guess {
    constructor(name, letters, complete) {
        this.name = name 
        this.letters = letters 
        this.complete = complete 
    }
}

function findCurrentRowIndex(array) {
    for (let i = 0; i<array.length; i++) {
        if (!array[i].complete){
            return i         
        }
    }
}

function fillCurrentTile(rowIndex, tileIndex, value, className) {
    let currentRow = document.querySelectorAll(".word-row")[rowIndex]
    let currentTile = currentRow.querySelectorAll(".letter-tile")[tileIndex]
    currentTile.innerText = value
    currentTile.classList.add(className)
}

function isLetterCorrect(index, letter, correctWord) {
    if (correctWord[index].toLowerCase() === letter.toLowerCase()) {
        return "correct"
    } else {
        if (correctWord.toLowerCase().includes(letter.toLowerCase())) {
            return "almost"
        } else {
            return "nope"
        }
    }
}



window.addEventListener("load",e=>{
    document.querySelector("#reset").addEventListener("mousedown", e=>window.location.reload())
    let theWord = theList[getRandomNumber(0, theList.length-1)]
    document.querySelector("#the-number").innerText = theWord.length
    let numberOfGuesses = 5 
    console.log(theWord)
    let alphabet = Array.from({length: 26},(_,i)=>String.fromCharCode(97+i))
    window.data = [] 
    for (let i = 0; i<numberOfGuesses; i++) {
        window.data.push(new Guess(`guess ${i+1}`, [], false))
    }

    renderWordToContainer(theWord, numberOfGuesses)

    document.addEventListener("keydown", e=>{
        if (alphabet.includes(e.key.toLowerCase())) {
            let currentRowIndex = findCurrentRowIndex(window.data)
            let currentGuess = window.data[currentRowIndex] 
            currentGuess.letters.push(e.key.toUpperCase())
            fillCurrentTile(
                currentRowIndex,
                currentGuess.letters.length-1,
                e.key.toUpperCase(),
                isLetterCorrect(currentGuess.letters.length-1, e.key, theWord)
            )
            if (currentGuess.letters.length === theWord.length) {
                if (currentRowIndex === window.data.length-1) {
                    document.querySelector("#answer").innerText = theWord + " :("
                }
                currentGuess.complete = true
                if (currentGuess.letters.join('').toLowerCase() === theWord) {
                    document.querySelector("#answer").innerText = theWord + " :)"
                }
            }
        }

    })
})
let largeTextFileURL = "https://apiacoa.org/publications/teaching/datasets/google-10000-english.txt"
let afterDarkURL = "https://www.cs.cmu.edu/~biglou/resources/bad-words.txt"

let theList = [
    "scanned",
    "reflections",
    "hunger",
    "mariah",
    "sic",
    "municipality",
    "usps",
    "joyce",
    "detective",
    "surgeon",
    "cement",
    "experiencing",
    "fireplace",
    "endorsement",
    "bg",
    "planners",
    "disputes",
    "textiles",
    "missile",
    "intranet",
    "closes",
    "seq",
    "psychiatry",
    "persistent",
    "deborah",
    "conf",
    "marco",
    "assists",
    "summaries",
    "glow",
    "gabriel",
    "auditor",
    "wma",
    "aquarium",
    "violin",
    "prophet",
    "cir",
    "bracket",
    "looksmart",
    "isaac",
    "oxide",
    "oaks",
    "magnificent",
    "erik",
    "colleague",
    "naples"
]



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
    let theWord = theList[getRandomNumber(0, theList.length-1)]
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
                currentGuess.complete = true
            }
        }

    })
})

let theList = ["sun", "oak", "mist", "hope", "glide", "trace", "crisp", "badge", "quilt", "planet", "garden", "shrink", "jovial", "expand", "texture"]

function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function createTile(letter) {
    let letterTile = document.createElement("div")  
    letterTile.innerText = letter ?? ""
    letterTile.classList.add("letter-tile")
    letterTile.contentEditable = true
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

window.addEventListener("load",e=>{
    let theWord = theList[getRandomNumber(0, theList.length-1)]
    let numberOfGuesses = 5
    console.log(theWord)
    renderWordToContainer(theWord, numberOfGuesses)




})
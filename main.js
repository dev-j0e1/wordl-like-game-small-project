
let theList = ["sun", "oak", "mist", "hope", "glide", "trace", "crisp", "badge", "quilt", "planet", "garden", "shrink", "jovial", "expand", "texture"]

function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function addTile(letter) {
    let wordlContainer = document.querySelector("#grid-container")
    let letterTile = document.createElement("div")  
    letterTile.innerText = letter 
    letterTile.classList.add("letter-tile")
    wordlContainer.append(letterTile)
}

function renderWordToContainer(word) {
    let letters = [...word]
    letters.forEach(e=>addTile(e))
}

window.addEventListener("load",e=>{
    let theWord = theList[getRandomNumber(0, theList.length-1)]
    console.log(theWord)
    renderWordToContainer(theWord)




})
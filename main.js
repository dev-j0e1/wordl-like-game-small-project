async function fetchTextFile() {
    // TODO: The approach with the mobile keybaord doesn't work for android users. Maybe make virtual keyboard for mobile?

    const url = "./bigWordList.txt"
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fileContent = await response.text();
        let allWords = fileContent.split("\n").filter(e=>e.length >= 3 && e.length < 6)


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

        document.addEventListener("keydown", e=>{
            if (e.key==="Enter" && window.gameover) {
                window.location.reload()
            }
        })


        document.querySelector("#main-container").addEventListener("touchstart", e=>{
            document.querySelector("#mobile-input").focus()
        })

        document.querySelector("#exit-info").addEventListener("mousedown",e=>document.querySelector("#info-card").hidden=true)

        document.querySelector("#info").addEventListener("mousedown",e=>{
            let infoCard = document.querySelector("#info-card")
            if (infoCard.hidden) {
                infoCard.hidden = false
            } 
        })

        document.querySelector("#reset").addEventListener("mousedown", e=>window.location.reload())
        let theWord = allWords[getRandomNumber(0, allWords.length-1)]
        document.querySelector("#the-number").innerText = theWord.length
        let numberOfGuesses = 5 
        let alphabet = Array.from({length: 26},(_,i)=>String.fromCharCode(97+i))
        window.data = [] 
        for (let i = 0; i<numberOfGuesses; i++) {
            window.data.push(new Guess(`guess ${i+1}`, [], false))
        }

        renderWordToContainer(theWord, numberOfGuesses)

        var youWinAudio = new Audio("./youwin.mp3")


        document.addEventListener("keydown", e=>{
            if (alphabet.includes(e.key.toLowerCase()) && !window.gameover) {
                let currentRowIndex = findCurrentRowIndex(window.data)
                let currentGuess = window.data[currentRowIndex] 
                currentGuess.letters.push(e.key.toUpperCase())
                fillCurrentTile(
                    currentRowIndex,
                    currentGuess.letters.length-1,
                    e.key.toUpperCase(),
                    isLetterCorrect(currentGuess.letters.length-1, e.key, theWord)
                )
                let rowCompleted = currentGuess.letters.length === theWord.length
                let gameWon = currentGuess.letters.join('').toLowerCase() === theWord
                let gameLost = currentRowIndex === window.data.length-1 && !gameWon

                function finishGame(won, lost) {
                    let face = won ? " :)" : lost ? " :(" : "" 
                    if (won || lost) {
                        window.gameover = true
                        document.querySelector("#reset").hidden = false
                        document.querySelector("#answer").innerText = theWord + face 
                    }
                    if (won) {
                        document.querySelector("body").style.background = "black"
                        document.querySelector("#answer").style.color = "white"
                        document.querySelector("#the-number").style.background = "white" 
                        youWinAudio.play()
                        setTimeout(()=>{

                            document.querySelector("#left").hidden = false
                            document.querySelector("#right").hidden = false
                        }, 4000)

                    }
                }

                if (rowCompleted) {
                    currentGuess.complete = true
                    finishGame(gameWon, gameLost)
                }
            }

        })


        

    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('content').textContent = 'Failed to load file.';
    }
}

fetchTextFile();

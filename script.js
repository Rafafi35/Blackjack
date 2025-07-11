let fullDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
let currentDeck = fullDeck
const playerHandText = document.getElementById("playerHand")
const log = document.getElementById("log")
const deckSize = document.getElementById("deckSize")
let playerHandValue = 0

function karteZiehen() {
    let randomZahl = Math.floor(Math.random() * 52)
    playerHandValue += currentDeck[randomZahl]
    deckSize.textContent = "Decksize: " + currentDeck.length
    playerHandText.textContent = "Your Hand: " + playerHandValue
    log.textContent = "You pulled a " + currentDeck[randomZahl]
}

function dealerZieht() {

}

karteZiehen()
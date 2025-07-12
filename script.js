let fullDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
let currentDeck = fullDeck
const playerHandText = document.getElementById("playerHand")
const dealerHandText = document.getElementById("dealerHand")
const log = document.getElementById("log")
const deckSize = document.getElementById("deckSize")
let playerHandValue = 0
let dealerHandValue = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function karteZiehen() {
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    playerHandValue += currentDeck[randomZahl]
    deckSize.textContent = "Decksize: " + currentDeck.length
    playerHandText.textContent = "Your Hand: " + playerHandValue
    log.textContent = "You drew a " + currentDeck[randomZahl]
    
}

function dealerZieht() {
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    dealerHandValue += currentDeck[randomZahl]
    deckSize.textContent = "Decksize: " + currentDeck.length
    dealerHandText.textContent = "Dealers Hand " + dealerHandValue
    log.textContent = "Dealer drew a " + currentDeck[randomZahl]
}

async function start() {
    karteZiehen()
    await sleep(2000)
    dealerZieht()
    await sleep(2000)
    karteZiehen()
}

start()
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
    playerHandText.textContent = "Your Hand: " + playerHandValue
    if (playerHandValue > 21) {
        log.textContent = "You drew a " + currentDeck[randomZahl] + " and busted."
    } else {
        log.textContent = "You drew a " + currentDeck[randomZahl]
    }
    currentDeck.splice(randomZahl, 1)
    deckSize.textContent = "Decksize: " + currentDeck.length
}

function dealerZieht() {
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    dealerHandValue += currentDeck[randomZahl]
    dealerHandText.textContent = "Dealers Hand " + dealerHandValue
    if (dealerHandValue > 21) {
        log.textContent = "Dealer drew a " + currentDeck[randomZahl] + " and busted"
    } else {
        log.textContent = "Dealer drew a " + currentDeck[randomZahl]
    }
    currentDeck.splice(randomZahl, 1)
    deckSize.textContent = "Decksize: " + currentDeck.length
}

async function handleStand() {
    document.getElementById("hitButton").removeEventListener("click", karteZiehen)
    document.getElementById("standButton").removeEventListener("click", handleStand)
    do {
        dealerZieht()
        await sleep(2000)
    } while (dealerHandValue <= 16)
    
    if (playerHandValue > dealerHandValue || dealerHandValue > 21) {
            log.textContent = "Player Wins"
        } else if (playerHandValue < dealerHandValue || playerHandValue > 21) {
            log.textContent = "Dealer Wins"
        } else {
            log.textContent = "Nobody wins"
        }

    await sleep(3000)
    start()
}

async function start() {
    log.textContent = "New Round"
    await sleep(2000)
    playerHandValue = 0
    playerHandText.textContent = "Your Hand: " + playerHandValue
    dealerHandValue = 0
    dealerHandText.textContent = "Your Hand: " + playerHandValue
    karteZiehen()
    await sleep(2000)
    dealerZieht()
    await sleep(2000)
    karteZiehen()

    document.getElementById("hitButton").addEventListener("click", karteZiehen)

    document.getElementById("standButton").addEventListener("click", handleStand)
}

start()
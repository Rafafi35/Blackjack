let fullDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
let currentDeck = fullDeck
const playerHandText = document.getElementById("playerHand")
const dealerHandText = document.getElementById("dealerHand")
const log = document.getElementById("log")
const deckSize = document.getElementById("deckSize")
let playerHandValue = 0
let dealerHandValue = 0
let playerState = ""

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function karteZiehen() {
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    playerHandValue += currentDeck[randomZahl]
    if (currentDeck[randomZahl] === 11) {
        playerState = "soft"
    } else if (playerHandValue > 21 && playerState === "soft") {
        playerHandValue -= 10
        playerState = ""
    }
    playerHandText.textContent = "Your Hand: " + playerState + " " + playerHandValue
    if (playerHandValue > 21) {
        log.textContent = "You drew a " + currentDeck[randomZahl] + " and busted."
        await sleep(2000)
        handleStand()
    } else {
        log.textContent = "You drew a " + currentDeck[randomZahl]
    }
    currentDeck.splice(randomZahl, 1)
    deckSize.textContent = "Decksize: " + currentDeck.length
}

function dealerZieht() {
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    dealerHandValue += currentDeck[randomZahl]
    if (currentDeck[randomZahl] === 11) {
        dealerState = "soft"
    } else if (dealerHandValue > 21 && dealerState === "soft") {
        dealerHandValue -= 10
        dealerState = ""
    }
    dealerHandText.textContent = "Dealers Hand " + dealerState + " " + dealerHandValue
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
    if (playerHandValue < 21) {
        while (dealerHandValue <= 16) {
        dealerZieht()
        await sleep(2000)
        }
    }
    
    
    if (playerHandValue > dealerHandValue && playerHandValue < 21 || dealerHandValue > 21) {
            log.textContent = "Player Wins"
        } else if (playerHandValue < dealerHandValue && dealerHandValue < 21 || playerHandValue > 21) {
            log.textContent = "Dealer Wins"
        } else {
            log.textContent = "Nobody wins"
        }

    await sleep(3000)
    start()
}

async function start() {
    log.textContent = "New Round"
    playerHandValue = 0
    playerHandText.textContent = "Your Hand: " + playerHandValue
    playerState = ""
    dealerHandValue = 0
    dealerHandText.textContent = "Your Hand: " + playerHandValue
    dealerState = ""
    await sleep(2000)
    karteZiehen()
    await sleep(2000)
    dealerZieht()
    await sleep(2000)
    karteZiehen()

    document.getElementById("hitButton").addEventListener("click", karteZiehen)

    document.getElementById("standButton").addEventListener("click", handleStand)
}

start()
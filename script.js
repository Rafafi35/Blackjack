let fullDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11]
let currentDeck = fullDeck
const playerHandText = document.getElementById("playerHand")
const dealerHandText = document.getElementById("dealerHand")
const log = document.getElementById("log")
const deckSize = document.getElementById("deckSize")
let playerHandValue = 0
let dealerHandValue = 0
let playerState = ""
let dealerState = ""
let wager = 0
const wagerDisplay = document.getElementById("wagerDisplay")
let balance = 100
const balanceDisplay = document.getElementById("balanceDisplay")
balanceDisplay.textContent = "Balance: " + balance
let roundIsRunnning = false
const chanceDisplay = document.getElementById("chance")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function karteZiehen() {
    document.getElementById("doubleButton").removeEventListener("click", handleDouble)
    let randomZahl = Math.floor(Math.random() * currentDeck.length)
    playerHandValue += currentDeck[randomZahl]
    if (currentDeck[randomZahl] === 11) {
        playerState = "soft"
    }
    if (playerHandValue > 21 && playerState === "soft") {
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
    }
    if (dealerHandValue > 21 && dealerState === "soft") {
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
    document.getElementById("doubleButton").removeEventListener("click", handleDouble)
    if (playerHandValue <= 21) {
        while (dealerHandValue <= 16) {
            dealerZieht()
            await sleep(2000)
        }
    }


    if (playerHandValue > dealerHandValue && playerHandValue <= 21 || dealerHandValue > 21) {
        log.textContent = "Player Wins"
        balance += wager * 2
    } else if (playerHandValue < dealerHandValue && dealerHandValue <= 21 || playerHandValue > 21) {
        log.textContent = "Dealer Wins"
    } else {
        log.textContent = "Nobody wins"
        balance += wager
    }

    wager = 0
    roundIsRunnning = false
    wagerDisplay.textContent = "Your Wager: " + wager
    balanceDisplay.textContent = "Balance: " + balance
}

async function handleDouble() {
    if (balance < wager) {
        log.textContent = "Your balance is to low. You cannot double"
    } else {
        document.getElementById("doubleButton").removeEventListener("click", handleDouble)
        document.getElementById("hitButton").removeEventListener("click", karteZiehen)
        document.getElementById("standButton").removeEventListener("click", handleStand)
        karteZiehen()
        balance -= wager
        wager = wager * 2
        await sleep(2000)
        handleStand()
    }
}

function raiseWager(value) {
    if (balance >= value && roundIsRunnning === false) {
        wager += value
        balance -= value
        wagerDisplay.textContent = "Your Wager: " + wager
        balanceDisplay.textContent = "Balance: " + balance
    }

}

let timesWinning = 0        //During the calcualtions: How many times does the player win
let outcomes = 0    //How many outcomes get calculated

function calculateChance() {
    console.log("calculating ...")
    let calculatingDeck = currentDeck
    let calculatingPlayerHand = playerHandValue
    let calculatingDealerHand = dealerHandValue
    for (let i = 0; i < calculatingDeck.length; i++) {
        calculatingPlayerHand += calculatingDeck[i]
        console.log("player draws " + calculatingDeck[i])
        for (let j = 0; j < calculatingDeck.length; j++) {
            calculatingDealerHand +=calculatingDeck[j]
            console.log("dealer draws " + calculatingDeck[j])
            if (calculatingPlayerHand > calculatingDealerHand) {
                timesWinning += 1
                console.log("player wins")
            }
            outcomes += 1
            console.log("Outcome " + outcomes)
            calculatingDealerHand = dealerHandValue
        }
        calculatingPlayerHand = playerHandValue
    }

    console.log("Player wins " + timesWinning + " of " + outcomes + " outcomes " + timesWinning/outcomes + "%")

}

async function start() {
    if (roundIsRunnning === false) {
        roundIsRunnning = true
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

        document.getElementById("doubleButton").addEventListener("click", handleDouble)
    }
}

calculateChance()
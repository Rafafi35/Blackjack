let deck = [
     2, 2, 2, 2,
     3, 3, 3, 3,
     4, 4, 4, 4,
     5, 5, 5, 5,
     6, 6, 6, 6,
     7, 7, 7, 7,
     8, 8, 8, 8,
     9, 9, 9, 9,
    10, 10, 10, 10,
    10, 10, 10, 10,
    10, 10, 10, 10,
    10, 10, 10, 10,
    11, 11, 11, 11
]
const playerHandText = document.getElementById("playerHand")
let playerHandValue = 0

function karteZiehen() {
    let randomZahl = Math.floor(Math.random() * 52)
    console.log(randomZahl)
    playerHandValue += deck[randomZahl]
    console.log(deck[randomZahl])
    playerHandText.textContent = "Your Hand: " + playerHandValue
}

karteZiehen()
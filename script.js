

let turn = "X";
let players = {};
let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.resetBtn');
let playGame = document.querySelector('#playGame')
let textToSpeak = "";


// textToSpeak = "let's play Tic Tac Toe";
// announce(textToSpeak);


playGame.addEventListener("click", () => {
    let firstName = document.querySelector('#name-first').value;
    let secondName = document.querySelector('#name-second').value;
    if (firstName == '') {
        firstName = 'Player X'
    }
    if (secondName == '') {
        secondName = 'Player 0'
    }
    players = {
        'X': firstName,
        0: secondName
    }
    console.log(players['X']);
    console.log(players[0]);
    document.querySelector('.enterNames').style.display = 'none';
    document.querySelector('.box1').style.display = "initial";
    document.querySelector('.cont1').style.display = "initial";
    gameStart();

})




function announce(textToSpeak) {
    let speakData = new SpeechSynthesisUtterance();
    speakData.text = textToSpeak;
    speakData.voice = window.speechSynthesis.getVoices()[0];

    speechSynthesis.speak(speakData);
}


resetBtn.addEventListener("click", () => {
    // console.log("rest btn was clicked")
    boxes.forEach(e => {
        e.innerHTML = "";
        document.querySelector('.turn').innerHTML = `<span>Turn for ${players['X']}</span>`
        e.style.animation = ""
    })

    announce("Resetting")
    turn = "X"
    textToSpeak = `Turn for ${players['X']}`;
    announce(textToSpeak)
})

//blinker
function blinker(text) {
    if (text) {
        var d = text;
        d.style.backgroundColor = (d.style.backgroundColor == 'blue' ? 'white' : 'blue');
        setTimeout('blinker(text)', 900);
    }
}

//WinCheck

function checkWin(boxes) {
    win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    for (const it of win) {
        if (boxes[it[0]].textContent !== "" && boxes[it[0]].textContent === boxes[it[1]].textContent && boxes[it[1]].textContent === boxes[it[2]].textContent) {
            console.log(boxes[it[0]].innerHTML)
            boxes[it[0]].style.animation = 'blink 0.5s infinite alternate';
            boxes[it[1]].style.animation = 'blink 0.5s infinite alternate';
            boxes[it[2]].style.animation = 'blink 0.5s infinite alternate';


            return true
        }
    }
    return false

}



function changeTurn(turn) {

    return turn ? 0 : 'X';
}

//Add event listener for each box
function gameStart() {
    document.querySelector('.turn').innerHTML = `<span>${players[turn]}'s turn</span>`
    textToSpeak = `Turn for ${players[turn]}`;
    announce(textToSpeak);
    boxes.forEach((e) => {
        e.addEventListener("click", () => {

            if (e.innerHTML == "") {
                e.innerHTML = `<span>${turn}</span>`;

                if (!checkWin(boxes)) {

                    turn = changeTurn(turn);
                    textToSpeak = `Turn for ${players[turn]}`;
                    announce(textToSpeak);

                    document.querySelector('.turn').innerHTML = `<span>${players[turn]}'s turn</span>`

                }
                else {

                    console.log(`${turn} won`)
                    document.querySelector('.turn').innerHTML = `${players[turn]} won`
                    textToSpeak = `${players[turn]} Won`;
                    announce(textToSpeak)


                }
            }


        })
    })
}

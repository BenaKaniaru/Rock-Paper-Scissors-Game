let scores = JSON.parse(localStorage.getItem('scores')) || {
    Wins: 0,
    Loses: 0,
    Ties: 0
};

document.querySelector('.js-display-result').innerHTML = `Your scores: ${scores.Wins} Computer scores: ${scores.Loses}   Ties: ${scores.Ties}`

let computerMove = '';

//add event listeners
let rockButton = document.querySelector('.js-rock-button');
let paperButton = document.querySelector('.js-paper-button');
let scissorsButton = document.querySelector('.js-scissors-button');
let resetButton = document.querySelector('.js-reset-score-button');
let autoPlayButton = document.querySelector('.js-auto-play-button');

rockButton.addEventListener(('click'), () => {
    playGame('Rock')
});

paperButton.addEventListener(('click'), () => {
    playGame('Paper')
});

scissorsButton.addEventListener(('click'), () => {
    playGame('Scissors')
});

autoPlayButton.addEventListener(('click'), () => {
    autoPlay()
})
document.body.addEventListener(('keydown'), (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('Rock')
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('Paper')
    } else if ( event.key === 's' || event.key === 'S') {
        playGame('Scissors')
    } else if (event.key === " ") {
        resetScores()
    }
});

let isAutoPlaying = false;

let intervalId;

function autoPlay() {

    if (!isAutoPlaying) {      
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
                playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false; 
    };

    if (autoPlayButton.innerHTML === 'Stop Auto Play') {
        autoPlayButton.innerHTML = 'Auto Play'; autoPlayButton.classList.remove('is-auto-playing');
    } else {
        autoPlayButton.innerHTML = 'Stop Auto Play'; autoPlayButton.classList.add('is-auto-playing')
    };
};

function playGame(playerMove) {
    let result = ''
    pickComputerMove();

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock'){
            result = 'The game is a Tie!'
        } else if (computerMove === 'Paper') {
            result = 'Computer Wins!'
        } else if (computerMove === 'Scissors') {
            result = 'You Win!'                
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock'){
            result = 'You Win!'
        } else if (computerMove === 'Paper') {
            result = 'The game is a Tie!'
        } else if (computerMove === 'Scissors') {
            result = 'Computer Wins!'  
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock'){
            result = 'Computer Wins!'
        } else if (computerMove === 'Paper') {
            result = 'You Win!'
        } else if (computerMove === 'Scissors') {
            result = 'The Game is a Tie!'  
        }
    };

    if (result === 'You Win!') {
        scores.Wins++ 
    } else if (result === 'Computer Wins!') {
        scores.Loses++
    } else if (result === 'The game is a Tie!') {
        scores.Ties++
    };

    document.querySelector('.js-display-moves').innerHTML = `You Picked ${playerMove}. The computer picked ${computerMove}. ${result}`
    document.querySelector('.js-reset-alert').innerHTML = '';
    document.querySelector('.js-display-result').innerHTML = `Your Scores: ${scores.Wins} Computer Scores: ${scores.Loses}   Ties: ${scores.Ties}`

    localStorage.setItem('scores', JSON.stringify(scores));
};

function pickComputerMove() {
    const randomNumber= Math.random();

    if (randomNumber > 0 && randomNumber < 1/3) {
        computerMove = 'Rock'
    } else if (randomNumber > 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper'
    } else if (randomNumber > 2/3 && randomNumber < 1) {
        computerMove = 'Scissors'
    }

    return computerMove;
};

function resetScores () {
    scores = {
        Wins: 0,
        Loses: 0,
        Ties: 0
    };

    localStorage.removeItem('scores');

    document.querySelector('.js-display-moves').innerHTML = '';
    document.querySelector('.js-reset-alert').classList.add('scores-reset');
    document.querySelector('.js-reset-alert').innerHTML = 'The scores have been reset!';
    document.querySelector('.js-display-result').innerHTML = `Your scores: ${scores.Wins} Computer scores: ${scores.Loses}   Ties: ${scores.Ties}`
};

resetButton.addEventListener(('click'), () => {
    let isConfirming = false;
    let timeoutId;

    document.querySelector('.js-reset-confirm').innerHTML = `<div class="reset-confirm-text">Are you sure you want to reset the scores?</div> <button onclick="resetScores(); document.querySelector('.js-reset-confirm').innerHTML = '';" class="yes-button js-yes-button">Yes</button> <button onclick="document.querySelector('.js-reset-confirm').innerHTML =''; " class="no-button js-button">No</button>`

    if (!isConfirming) {
        timeoutId = setTimeout(()=>{
                    document.querySelector('.js-reset-confirm').innerHTML = ''
                }, 4000);
        isConfirming = true;
    } else {
        clearTimeout(timeoutId);
        isConfirming = false;
    }    
});

/*let confirmReset = document.querySelector('.js-yes-button');
let declineReset = document.querySelector('.js-no-button');

confirmReset.addEventListener(('click'), () => {
    resetScores();
    document.querySelector('.js-reset-confirm').innerHTML = '';
})*/

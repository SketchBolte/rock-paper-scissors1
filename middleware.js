let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
/* If left value is false it will automatically use right value*/

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `<p class="update-score">Wins: ${score.wins}</p><p class="update-score">Loses: ${score.loses}</p><p class="update-score">Ties: ${score.ties}</p>`;
};
updateScoreElement();

let result = '';

function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissor'
    }
    return computerMove;
}

let issAutoPlay = false;
let intervalId;
//const autoPlay = () => {
//   
//}
function autoPlay () {
    if (!issAutoPlay) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        issAutoPlay = true;
    } else {
        clearInterval(intervalId);
        issAutoPlay = false;
    }
}

function playgame(playerMove) {

    let computerMove = pickComputerMove();

    if (playerMove === 'Scissor') {

        if (computerMove === 'Rock') {
            result = 'You Loose.';
        } else if (computerMove === 'Paper') {
            result = 'You Win.'
        } else if (computerMove === 'Scissor') {
            result = 'Tie.'
        }

    } else if (playerMove === 'Paper') {

        if (computerMove === 'Rock') {
            result = 'You Win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.'
        } else if (computerMove === 'Scissor') {
            result = 'You Loose.'
        }

    } else if (playerMove === 'Rock') {

        if (computerMove === 'Rock') {
            result = 'Tie. ';
        } else if (computerMove === 'Paper') {
            result = 'You Loose.'
        } else if (computerMove === 'Scissor') {
            result = 'You Win.'
        }

    }

    if (result === 'You Win.') {
        score.wins += 1
    } else if (result === 'Tie.') {
        score.ties += 1
    } else {
        score.loses += 1
    }



    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `<p>Your Pick <img src="${playerMove}-emoji.png" alt=""></p><p>Computer Pick <img src="${computerMove}-emoji.png" alt=""></p>`;


}

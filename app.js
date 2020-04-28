/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLОBAL score. 
After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.

*/

var scores, roundScore, activePlayer, gamePlaying, diceOne, diceTwo; 
var lostPoints = document.querySelector('.lostPoints');

var firstDice = document.getElementById('first-dice');
var secondDice = document.getElementById('second-dice');
var winningScore = document.getElementById('winning-score').value;
//var nameOne = document.getElementById('name-one');
//var nameTwo = document.getElementById('name-two');

init();

//document.getElementById('name-0') = nameOne.value;
//document.getElementById('name-1') = nameTwo.value ;

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; 
        
    firstDice.style.display = 'none';
    secondDice.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    lostPoints.style.display = 'none';
    winningScore = "";
    //nameOne.value = ' ';
    //nameTwo.value = ' ';

}

//Next player turn
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    firstDice.style.display = 'none';
    secondDice.style.display = 'none';
}

//Roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //Random number
        diceOne = Math.floor(Math.random() *6) + 1;
        diceTwo = Math.floor(Math.random() *6) + 1;

        //Display the result
        firstDice.style.display = 'block';
        firstDice.src = 'dice-'+ diceOne +'.png';

        secondDice.style.display = 'block';
        secondDice.src = 'dice-'+ diceTwo +'.png';

        //Update the round score IF the rolled number was NOT a 1
        if (diceOne !== 1 && diceTwo !== 1) {
            //Add score
            roundScore += diceOne + diceTwo; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lostPoints.style.display = 'none';
        } else {
            lostPoints.style.display = 'block';
            //Next player
            nextPlayer();
        }
    }
});

//Hold the points
document.querySelector('.btn-hold').addEventListener('click', function () { 
    if(gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Undefined, 0, null or " " are COERCED to false
        // Check if the input is ' '
        if (winningScore == false) {
            winningScore = 100;
        }
        //Check if player won the game 
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            firstDice.style.display = 'none';
            secondDice.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

//Start a new game 
document.querySelector('.btn-new').addEventListener('click', init);

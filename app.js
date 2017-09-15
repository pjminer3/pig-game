/*
RULES OF THE GAME:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Set original default variables
let scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;


document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {
  // Generate random #
  var dice = Math.floor(Math.random() * 6) + 1;

  // Display number and update image
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  
  // Update roundScore if # is not 1
  if (dice !== 1) {

    // Add dice value to roundScore
    roundScore += dice;
    // Make player's current score visible and equal to round score
    document.getElementById('current-' + activePlayer).textContent = roundScore;

  } else {
    
    // Switch the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Reset currentScore of both players
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    // Reset roundScore
    roundScore = 0;
    // Switch 'active class'
    document.getElementsByClassName('player-0-panel')[0].classList.toggle('active');
    document.getElementsByClassName('player-1-panel')[0].classList.toggle('active');
    // Make dice disapear <-- COMMENTED OUT BECAUSE I LIKE IT BETTER WHEN YOU CAN SEE THE DICE WITH 1 ROLLED
    //diceDOM.style.display = 'none';

  }
});


// document.querySelector('#current-' + activePlayer).textContent = dice;

// var x = document.querySelector('#score-0').textContent;
// console.log(x);















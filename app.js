/*
RULES OF THE GAME:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Set original default variables
let scores, roundScore, activePlayer, gamePlaying, goalScore, rebuttleRound;

goalScore = 20;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
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
      if (rebuttleRound) {
        // If it's rebuttle round and Player 2 Rolls a 1 it's game over
        endGame();
      } else {
        nextPlayer();
      }
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {  
    if (rebuttleRound === false) {
      // Add current score to global score
      scores[activePlayer] += roundScore;
    
      // Update UI of global score
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

      // Check to see if theres a winner => if no winner nextPlayer()
      if (scores[activePlayer] >= goalScore) {
        // Check to see if its Player 2 that won => If true then no rebuttle round
        if (activePlayer === 1) {
          endGame();
          // gamePlaying = false;
          // document.getElementById('name-' + activePlayer).textContent = 'Winner!';
          // document.querySelector('.dice').style.display = 'none';
          // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          // document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        } else {
          // If it was Player 1 that one, Player 2 gets one last chance at Rebuttle
          rebuttleRound = true;
          document.getElementById('name-1').textContent = 'REBUTTLE!';
          nextPlayer();
        }
      } else {
        nextPlayer();
      }
    } else {
      // THIS IS WHAT HAPPENS IF IT'S THE REBUTTLE ROUND
      if (activePlayer !== 1) { throw Error; }  // To ensure only player 2 is in in rebuttle mode
      // Add current score to global score
      scores[activePlayer] += roundScore;
      // Update UI of global score
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      // See if Player 2's score is greater than goal
      if (scores[activePlayer] >= goalScore) {
      // If greater than goal, goalScore += 10, rebuttleround = false, next move
        goalScore += 10;
        rebuttleRound = false;
        document.getElementById('name-1').textContent = 'Player 2';
        nextPlayer();
      } else {
        endGame();
      }
    }
  }
})

function nextPlayer() {
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
}

document.querySelector('.btn-new').addEventListener('click',init);

// Initialize a new game
function init() {
  // Resets initial scores
  gamePlaying = true;
  rebuttleRound = false;
  goalScore = 20;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  
  // Resets inital UI displayed scores
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function endGame() {
  if (rebuttleRound === false) {
    gamePlaying = false;
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
  } else {
    gamePlaying = false;
    document.getElementById('name-0').textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('winner');
  }
}














//Leo Manzo
//01-05-2021 --> 01-09-2021
//CodeStack LVL 2
//Create a Rock Paper Scissors Lizard Spock Game
//Game must have both CPU and 2 player mode and different amounts of rounds allowed to be selected
//finished product

import * as fetchItems from './fetch.js'
let p1Choice = " ";
let p2Choice = " ";
let p1Score = 0;
let p2Score = 0;
let numOfPlayers = 0;
let winTotal = 0;
let clickCount = 0;
let instructions = document.getElementById("instructions");
let scoreCount = document.getElementById("scoreCount");
let playersCount = document.getElementById("playersCount");
let bestOfCount = document.getElementById("bestOfCount");
//gameSave will keep the rounds/players saved and not let you switch mid-game
let gameSave = 1;
let nextBtn = document.getElementById("nextBtn").addEventListener("click", () => {
    gameSave = 1;
    instructions.innerText = "Make your selection"
});
let selectedGame = 1;
function selectedGameCheck(){
    if(selectedGame = 0){
        alert("You cannot make that selection at this moment");
    }
    //The game will set selectedGame to off so it cannot be re-selected mid game, it will reset at the end of match
}
//selection buttons
let rockBtn = document.getElementById("rockBtn").addEventListener("click", () => {
    startGame('Rock');
});
let paperBtn = document.getElementById("paperBtn").addEventListener("click", () => {
    startGame('Paper');
});
let scissorsBtn = document.getElementById("scissorsBtn").addEventListener("click", () => {
    startGame('Scissors');
});
let lizardBtn = document.getElementById("lizardBtn").addEventListener("click", () => {
    startGame('Lizard');
});
let spockBtn = document.getElementById("spockBtn").addEventListener("click", () => {
    startGame('Spock');
});
//Amount of players buttons
let p1Btn = document.getElementById("p1Btn").addEventListener("click", () => {
    if (selectedGame == 0) {
        alert("You cannot make that selection at this moment");
    }
    else { numOfPlayers = 1;
        playersCount.innerText = 'Players: 1' }
});
let p2Btn = document.getElementById("p2Btn").addEventListener("click", () => {
    if (selectedGame == 0) {
        alert("You cannot make that selection at this moment");
    }
    else { numOfPlayers = 2; 
        playersCount.innerText = 'Players: 2' }
});
//Amount of rounds buttons
let win3 = document.getElementById("win3").addEventListener("click", () => {
    if (selectedGame == 0) {
        alert("You cannot make that selection at this moment");
    }
    else { winTotal = 2;
            bestOfCount.innerText = 'Best of: 3' }
});
let win5 = document.getElementById("win5").addEventListener("click", () => {
    if (selectedGame == 0) {
        alert("You cannot make that selection at this moment");
    }
    else { winTotal = 3;
        bestOfCount.innerText = 'Best of: 5' }
});
let win7 = document.getElementById("win7").addEventListener("click", () => {
    if (selectedGame == 0) {
        alert("You cannot make that selection at this moment");
    }
    else { winTotal = 4;
        bestOfCount.innerText = 'Best of: 7' }
});
//pulls cpu api from fetch.js to give us cpu answers
function cpuChoice() {
    fetchItems.setUrl("https://csa2020studentapi.azurewebsites.net/rpsls");
    fetchItems.getData();
    setTimeout(() => {
        p2Choice = fetchItems.getValue();
    }, 400);
}
//This function will determine the beginning game options the user has selected and give
//the appropriate responses on the page for rounds and num of players 
function startGame(selection) {
    if (numOfPlayers == 2 && winTotal > 0 && gameSave == 1) {
        if (clickCount == 0) {
            clickCount++;
            gameSave=0;
            selectedGame = 0;
            p1Choice = selection; 
        }
        else if (clickCount == 1 && winTotal > 0 && gameSave == 1) {
            p2Choice = selection;
            console.log(p2Choice);
            clickCount = 0;
            rpslsSwitch(p1Choice);
        }
    }
    else if (numOfPlayers == 1 && winTotal > 0 && gameSave == 1) {
        selectedGame = 0;
        p1Choice = selection;
        cpuChoice();
        setTimeout(() => {
            rpslsSwitch(p1Choice);
        }, 1000);
    }
    else if (numOfPlayers > 0 && winTotal > 0 && gameSave == 0) {
        alert('Dont forget to hit the Next button');
    }
    else { alert('Please select a number of players, and number of games to play. Then make your first selection!') }
}
//This function compares P1 Score and P2 score to winning number and if/when one player reaches that number,
//the game will alert players of the winner and reset all functions to start a new game.
function didIWin() {
    if (p1Score == winTotal) {
        winTotal = 0;
        numOfPlayers = 0;
        p1Score = 0;
        p2Score = 0;
        gameSave = 0;
        selectedGame = 1;
        instructions.innerText = 'BAZINGA! Player1 wins. To play again, press Next and select the number of players and games!';
    }
    else if (p2Score == winTotal) {
        winTotal = 0;
        numOfPlayers = 0;
        p1Score = 0;
        p2Score = 0;
        gameSave = 0;
        selectedGame = 1;
        instructions.innerText = 'BAZINGA! Player2 wins. To play again, press Next and select the number of players and games!'
    }
    else {
        p1Choice = "";
        p2Choice = "";
        gameSave = 0;
        
        console.log('Press Next to Continue');
    }
}
//This nested switch statement compares p1 choice and p2 choice and decides if 
//one players score is less than, greater than, or equal to the other
//Bryan Stewart helped me tremendously on this nested switch statement
//I was completely lost before he helped me but after walking through it and setting it up in my game, 
//I feel much more comfortable and understand how this is functioning. 
function rpslsSwitch(p1) {
    switch (p1) {
        // rockCases
        case 'Rock':
            switch (p2Choice) {
                case 'Paper':
                    p2Score++;
                    console.log("Paper covers Rock")
                    instructions.innerText = 'Paper Covers Rock, point Player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    console.log(p1Score + '  VS  ' + p2Score);
                    didIWin();
                    break;
                case 'Scissors':
                    p1Score++;
                    console.log("Rock crushes Scissors")
                    instructions.innerText = 'Rock crushes scissors, point Player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    console.log(p1Score + '  VS  ' + p2Score);
                    didIWin();
                    break;
                case 'Lizard':
                    p1Score++;
                    console.log("Rock crushes Lizard")
                    instructions.innerText = 'Rock crushes Lizard, point Player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    console.log(p1Score + '  VS  ' + p2Score);
                    didIWin();
                    break;
                case 'Spock':
                    p2Score++;
                    console.log("Spock vaporizes Rock")
                    instructions.innerText = 'Spock vaporizes rock, point Player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    console.log(p1Score + '  VS  ' + p2Score);
                    didIWin();
                    break;
                default:
                    console.log('Both players selected the same answer. Result: no points.');
                    instructions.innerText = 'Both players selected the same answer. Result: no points.'; 
                    didIWin();
                    break;
            } break;
        //paperCases
        case 'Paper':
            switch (p2Choice) {
                case 'Rock':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Paper covers rock. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Scissors':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Scissors cuts paper. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Lizard':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Lizard eats paper. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Spock':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Paper disproves Spock. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                default:
                    console.log('We appear to have a tie...');
                    instructions.innerText = 'Both players have chosen the same answer. We have a tie'
                    didIWin();
                    break;
            } break;
        // scissorCases
        case 'Scissors':
            switch (p2Choice) {
                case 'Rock':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Rock beats scissors. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Paper':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Scissors cuts paper. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Lizard':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Scissors decapitates lizard. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Spock':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Spock smashes scissors. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                default:
                    console.log('We appear to have a tie...');
                    instructions.innerText = 'Both players have chosen the same answer. We have a tie'
                    didIWin();
                    break;
            }break;
        //lizardCases
        case 'Lizard':
            switch (p2Choice) {
                case 'Rock':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Rock crushes lizard. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Paper':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Lizard eats paper. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Scissors':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Scissors decapitates liard. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Spock':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Lizard poisons spock. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                default:
                    console.log('We appear to have a tie...');
                    instructions.innerText = 'Both players have chosen the same answer. We have a tie'
                    didIWin();
                    break;
            }break;
        // spockCases
        case 'Spock':
            switch (p2Choice) {
                case 'Rock':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Spock vaporizes rock. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Paper':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Paper disproves Spock. Point player 2';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Scissors':
                    p1Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Scissors cuts paper. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                case 'Lizard':
                    p2Score++;
                    console.log(p1Score + '  VS  ' + p2Score);
                    instructions.innerText = 'Liard poisons Spock. Point player 1';
                    scoreCount.innerText = 'Player 1 : ' + p1Score + ' / ' + 'player 2 : ' + p2Score;
                    didIWin();
                    break;
                default:
                    console.log('We appear to have a tie...');
                    didIWin();
                    break;
            }break;
        default:
            console.log('Something went wrong...');
            break;
    }
}
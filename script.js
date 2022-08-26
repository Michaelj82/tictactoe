
// make board array

let board = [
'', '', '',
'', '', '',
'', '', ''
];

//select board id from HTML

const boardScreen = document.getElementById('board');

// elements
const spots = document.querySelectorAll(".element");

//player one input
let playerOneInput = document.getElementById('playerOneName')
//player two input
let playerTwoInput = document.getElementById('playerTwoName')

//player one and two headers
let playerOneHeader = document.getElementById('playerOneHeader');
let playerTwoHeader = document.getElementById('playerTwoHeader');

//game start boolean
let gameStart = false;

// game start button
let startGameButton = document.getElementById('startGameButton');



//value to let switching between x and o 
let turn = false;

//function to allow switching between x and o

function switchTurn(){
    turn = turn !== true;
}


//put elements from board on screen

function updateBoard(){

    for (let i = 0; i < spots.length; i++){

        let symbol = board[i];

        if (symbol == 'x'){
            spots[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        }else if (symbol == 'o'){
            spots[i].innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>'

        }else{
            spots[i].innerHTML = ''
        }
        
    }

};


//player object

const Player = (name, playerTurn, symbol) => {
    //player move, if clicks on an empty spot it will put it on the board, check win, and switch turn
    const playerMove = (element) =>{
        elementNum = element.id;
        if (board[elementNum] == ''){
            board[elementNum] = symbol;
            updateBoard()
            checkWin()
            checkTie()
            switchTurn()   
        };


    
    };

    return {name, playerTurn, playerMove}
}

//makes objects
const PlayerOne = Player('Player 1', false, 'x');
const PlayerTwo = Player('Player 2', true, 'o')






//initializes game
function startGame(){
    
    //makes the playerOneName the input
    let playerOneName = playerOneInput.value;
    let playerTwoName = playerTwoInput.value;


    if (playerOneName == ''){
        playerOneName = 'Player 1'
    }
    if (playerTwoName == ''){
        playerTwoName = 'Player 2'
    }

    PlayerOne.name = playerOneName

    PlayerTwo.name = playerTwoName

    //makes the header the name
    playerOneHeader.innerHTML = playerOneName;
    playerTwoHeader.innerHTML = playerTwoName;

    //conditions for gameplay
    gameStart = true

    playerOneInput.disabled = true;
    playerTwoInput.disabled = true;

    startGameButton.disabled = true;

}

function resetGame(){
    //conditions for game reseting
    gameStart = false
    turn = false
    playerOneHeader.innerHTML = 'Player 1'
    playerTwoHeader.innerHTML = 'Player 2'
    PlayerOne.name = 'Player 1'
    PlayerTwo.name = 'Player 2'

    playerOneInput.value = ''
    playerTwoInput.value = ''


    playerOneInput.disabled = false;
    playerTwoInput.disabled = false;

    startGameButton.disabled = false;
    
    boardScreen.replaceChildren(...spots)
    boardScreen.classList.remove('winningCover')


    //clears board
    for (let i = 0; i < board.length; i++){
        board[i] = ''
    };

    updateBoard()

    


}

function checkTie(){
    let count = 0;
    for (let i = 0; i < board.length; i++){
        if (board[i] == ''){
            count += 1
        }
    };
    if (count == 0 && gameStart == true){
        let tieResult = document.createElement('div');
        tieResult.classList.add('winningText');
        tieResult.textContent = "It's a tie!"
        boardScreen.classList.add('winningCover');
        boardScreen.appendChild(tieResult)
        gameStart = false

    }


}

//check if there's a winning pattern

function checkWin(){

    //given numbers, will check if all of them match
    function checkLines(numbers, symbol, playerName){
        let total = 0
        for (let i = 0; i < numbers.length; i++){
            if (board[numbers[i]] == symbol){
                total += 1;
            }

        }
        if (total == 3){
            let congratulations = document.createElement('div');
            congratulations.classList.add('winningText');
            congratulations.textContent = 'Congratulations! ' + playerName + " has won!"
            boardScreen.classList.add('winningCover');
            boardScreen.appendChild(congratulations)
            gameStart = false
        }
    }
    //check horizontal
    checkLines([0,1,2], 'x', PlayerOne.name)
    checkLines([0,1,2], 'o', PlayerTwo.name)

    checkLines([3,4,5], 'x', PlayerOne.name)
    checkLines([3,4,5], 'o', PlayerTwo.name)

    checkLines([6,7,8], 'x', PlayerOne.name)
    checkLines([6,7,8], 'o', PlayerTwo.name)
    //check vertical
    checkLines([0,3,6], 'x', PlayerOne.name)
    checkLines([0,3,6], 'o', PlayerTwo.name)

    checkLines([1,4,7], 'x', PlayerOne.name)
    checkLines([1,4,7], 'o', PlayerTwo.name)

    checkLines([2,5,8], 'x', PlayerOne.name)
    checkLines([2,5,8], 'o', PlayerTwo.name)
    //check diagonal
    checkLines([0,4,8], 'x', PlayerOne.name)
    checkLines([0,4,8], 'o', PlayerTwo.name)

    checkLines([2,4,6], 'x', PlayerOne.name)
    checkLines([2,4,6], 'o', PlayerTwo.name)


}





//basic turn function called


function gameTurn(element){
    //if Start Game button has been pressed
    if (gameStart == true){
        if (PlayerOne.playerTurn == turn){
            PlayerOne.playerMove(element)
        }else if (PlayerTwo.playerTurn == turn){
            PlayerTwo.playerMove(element)
        }
    //if not, do nothing, dont allow turns
    }else if (gameStart == false){

    }



};
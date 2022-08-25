
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

    const playerMove = (element) =>{
        elementNum = element.id;
        if (board[elementNum] == ''){
            board[elementNum] = symbol;
            updateBoard()
            checkWin()
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
    console.log('bruh')
    

    let playerOneName = playerOneInput.value;
    PlayerOne.name = playerOneName
    let playerTwoName = playerTwoInput.value;
    PlayerTwo.name = playerTwoName
    console.log(playerOneName)
    console.log(playerTwoName)

    if (playerOneName == ''){
        playerOneName = 'Player 1'
    }
    if (playerTwoName == ''){
        playerTwoName = 'Player 2'
    }


    playerOneHeader.innerHTML = playerOneName;
    playerTwoHeader.innerHTML = playerTwoName;

    gameStart = true

    playerOneInput.disabled = true;
    playerTwoInput.disabled = true;

    startGameButton.disabled = true;

}

function resetGame(){
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

    for (let i = 0; i < board.length; i++){
        board[i] = ''
    };

    updateBoard()

    


}



//check if there's a winning pattern

function checkWin(){
    let playerOneCheck = 'x';
    let playerTwoCheck = 'o';

    function checkLines(numbers, symbol, playerName){
        let total = 0
        for (let i = 0; i < numbers.length; i++){
            if (board[numbers[i]] == symbol){
                total += 1;
            }

        }
        if (total == 3){
            alert(playerName + ' has won!')
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
            console.log(PlayerOne.name)
        }else if (PlayerTwo.playerTurn == turn){
            PlayerTwo.playerMove(element)
            console.log(PlayerTwo.name)
        }
    //if not, do nothing, dont allow turns
    }else if (gameStart == false){

    }



};
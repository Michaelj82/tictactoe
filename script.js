
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

//x and o element
let x = document.createElementNS('http://www.w3.org/2000/svg', 'svg');


let o = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

//value to let switching between x and o 
let turn = false

//function to allow switching between x and o

function switchTurn(){
    turn = turn !== true;
}


// width="100%"   stroke="currentColor"  
// stroke-linejoin="round" ><circle  cy="12" r="10"></circle></svg>

//put elements from board on screen

function updateBoard(){

    for (let i = 0; i < spots.length; i++){

        let symbol = board[i];

        if (symbol == 'x'){
            spots[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        }else if (symbol == 'o'){
            spots[i].innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>'

        }
        
    }

};

function playerMove(element){
    elementNum = element.id;
    if (turn == false){
        board[elementNum] = 'x'
        updateBoard()
        switchTurn()
    }else{
        board[elementNum] = 'o'
        updateBoard()
        switchTurn()
    }
}


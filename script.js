const gameBoard =(()=>{

let gameBoardArr = [[],[],[]];
let player1Marking = [];
let player2Marking = [];
let winner = null;

const playerFactory = (name, markingChoice, turn)=>{
return { name, markingChoice, turn }
};

let player1=playerFactory('player 1','X',true);
let player2=playerFactory('player 2','O',false);

//display marking through DOM
const displayController=(()=>{

    let markedSpace = 0;
    const spaces = document.querySelectorAll(".space");
   
    spaces.forEach((space)=> {
        space.textContent=gameBoardArr[space.id[0]][space.id[1]];
    });
    //check number of spaces marked 
    spaces.forEach((space)=> {
        if(space.textContent){
            markedSpace++;
        }
        //announce 'fair game' if all spaces marked with no winner 
        if(markedSpace == 9){
        winner="Fair game";
        announceWinner(winner);
        }
     });
});

//checking player's marking location array in winning array
function checkWinner(playerArr) {

    let count = [0,0,0,0,0,0,0,0];
    let winningArr = [
    [00,01,02],
    [10,11,12],
    [20,21,22],
    [00,10,20],
    [01,11,21],
    [02,12,22],
    [00,11,22],
    [02,11,20]
    ];
    
    for(l=0;l<playerArr.length;l++){
        for(i=0;i<winningArr.length;i++){
            if(winningArr[i].includes(playerArr[l])){
                count[i]+=1;
            }
            if(count[i] == 3){
                return  true; 
            }
        }
    }
}

//control player's turn and register marking in array
const playerTurns =((event)=>{
    const space=document.getElementById(`${event.target.id}`);

    if (player1.turn == true && event.target.textContent ==''){ 
            
        gameBoardArr[event.target.id[0]][event.target.id[1]]=player1.markingChoice;
        //register location of player 1 into array
        player1Marking.push(Number(event.target.id));
        space.style.color='#de87a1';  
        announce.textContent="PLAYER 2's turn : O";    
        displayController();
        //allow player 2's turn next and stop player 1's turn
        player1.turn = false;
        player2.turn = true;
        const status = checkWinner(player1Marking);
        if(status == true){
             winner = 'player 1';
             player2.turn = false;
        }

    } else if (player2.turn == true && event.target.textContent ==''){
    
        gameBoardArr[event.target.id[0]][event.target.id[1]]=player2.markingChoice;
        //register location of player 2 into array
        player2Marking.push(Number(event.target.id));
        space.style.color='#6988d8';
        announce.textContent="PLAYER 1's turn : X";    
        displayController();
        //allow player 1's turn next and stop player 2's turn
        player1.turn = true;
        player2.turn = false;
        
        const status = checkWinner(player2Marking);
        if(status == true){
        player1.turn =false;
        winner = 'player 2';
      }
    }
    //announce winner if winner is true
    if(winner){
        announceWinner(winner);
    }
});

//announce winner 
function announceWinner(winner){
    //show replay button when game ends
    replay.style.display='block';

    if(winner=='player 1'){
        winner='Congratulations player 1! You Win!';
    } else if(winner=='player 2'){
        winner='Congratulations player 2! You Win!';
    } else if(winner=='Fair game'){
        winner="It's a fair game.";
    }
  announce.textContent=winner;    
}

//reload page when replay button pressed
function reset(){
window.location.reload(true);
}
//annoucne first instruction for player 1's turn
document.querySelector('#announce').textContent="PLAYER 1's turn : X";    
window.addEventListener('click', playerTurns);
const replay=document.querySelector('#replay');
const announce=document.querySelector('#announce');

replay.addEventListener('click', reset);
//hide replay button when game start
replay.style.display='none';

})();


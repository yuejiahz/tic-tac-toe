const gameBoard =((player)=>{

let gameBoardArr=[[],[],[]];
let player1Marking=[];
let player2Marking=[];

let winner = null;
let turns = 0;

const playerFactory = (name, markingChoice, turn)=>{
return { name, markingChoice, turn }
};

let player1=playerFactory('player 1','X',true);
let player2=playerFactory('player 2','O',false);

const displayController=(()=>{
const spaces=document.querySelectorAll(".space");
spaces.forEach((space)=> space.textContent=gameBoardArr[space.id[0]][space.id[1]]);
});



function checkWinner(playerArr) {
    let count=[0,0,0,0,0,0,0,0];
    let winningArr=[
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
            if(count[i]==3){
                return  true; 
            }
        }
    }

}

const playerTurns=((event)=>{
    if (player1.turn == true && event.target.textContent ==''){     
        gameBoardArr[event.target.id[0]][event.target.id[1]]=player1.markingChoice;
        player1Marking.push(Number(event.target.id));
        player1.turn=false;
        player2.turn=true;
        checkWinner(player1Marking);
    } else if (player2.turn == true && event.target.textContent ==''){
        gameBoardArr[event.target.id[0]][event.target.id[1]]=player2.markingChoice;
        player2Marking.push(Number(event.target.id));
        player1.turn=true;
        player2.turn=false;
        checkWinner(player2Marking);
    }
    displayController();
   
});

window.addEventListener('click', playerTurns);

})();


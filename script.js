const ticTacToe=(function (h){
    let result=['X','O','X','O','X','O','X','O','O'];
    const spaces=document.querySelectorAll(".space");
    spaces.forEach((space)=> {
        space.textContent=result[space.id[6]-1]; 
    });
 
})();



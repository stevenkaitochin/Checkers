// Steven Chin & Tzuhsien Liu

let game;

// On document loaded init Game
document.addEventListener("DOMContentLoaded", e => {
  let selected = false;
  let prevPiece;
  let board = new Board();

  game = new Game();

  let reset = document.querySelector(".title");
  reset.addEventListener("click", e =>{
    game.turn = 0;
    board.resetBoard();
    console.log("Game Reset");
  });

  document.addEventListener("click", e =>{
    let target = e.target;
    let isBlock = target.classList.contains("black");
    
    let turn = game.getTurn() % 2 === 0 ? "playerP" : "playerG";
    let isPiece = target.classList.contains(turn);    
    
    //Select a piece
    if (isPiece && !selected) {
      target.classList.toggle("selected");
      prevPiece = target;
      selected = true;
    } 
    //Select a different piece
    else if (isPiece && selected) {
      target.classList.toggle("selected");
      if(prevPiece !== target){
        prevPiece.classList.remove("selected");
      }
      prevPiece = target;
      selected = true;
    }
    //Select a block after selecting a piece
    else if (isBlock && selected) {
      let validMove = game.checkIfValidMove(target, prevPiece);
      if (validMove || game.checkHasMoved()) {
        console.log(game.getTurn());
        if(prevPiece){
          prevPiece.classList.remove("selected");
        }
        prevPiece.parentNode.removeChild(prevPiece);
        target.appendChild(prevPiece);
        selected = false;
        game.nextTurn();
      }
    }

  });

});




// Steven Chin & Tzuhsien Liu

let game;

// On document loaded init Game
document.addEventListener("DOMContentLoaded", e => {
  let selected = false;
  let prevPiece;
  let board = new Board();
  console.log("Game Started");

  game = new Game();
  console.log("Turn " + game.getTurn());

  let reset = document.querySelector(".title");
  reset.addEventListener("click", e =>{
    board.resetBoard();
    console.log("Game Reset");
  });

  //Select a piece
  document.addEventListener("click", function(e) {
    let target = e.target;
    let isPiece = target.classList.contains("piece");

    if (isPiece && !selected) {
      target.classList.toggle("selected");
      prevPiece = target;
      selected = true;
    } else if (isPiece && selected) {
      target.classList.toggle("selected");
      if(prevPiece !== target){
        prevPiece.classList.remove("selected");
      }
      prevPiece = target;
      selected = true;
    }
  });

  //Move the piece
  document.addEventListener("click", e =>{
    let target = e.target;
    let isBlock = target.classList.contains("black");
    let validMove = game.checkIfValidMove(target, prevPiece, selected);
    if (isBlock && selected && validMove) {
      if(prevPiece){
        prevPiece.classList.remove("selected");
      }
      prevPiece.parentNode.removeChild(prevPiece);
      target.appendChild(prevPiece);
      selected = false;
      game.nextTurn();
      console.log("Made a move");
      console.log("Turn " + game.getTurn());
    }
  });

});




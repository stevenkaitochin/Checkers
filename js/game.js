
// Steven Chin & Tzuhsien Liu

// On document loaded init Game
document.addEventListener("DOMContentLoaded", e => {
  let selected = false;
  let prevPiece;
  let board = new Board();
  console.log("Game Started");

  let reset = document.querySelector(".title");
  reset.addEventListener("click", e =>{
    board.resetBoard();
    console.log("Game Reset");
  });

  //Select a piece
  document.addEventListener("click", e =>{
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
    let validMove = checkIfValidMove(target);
    if (isBlock && selected && validMove) {
      if(prevPiece){
        prevPiece.classList.remove("selected");
      }
      prevPiece.parentNode.removeChild(prevPiece);
      target.appendChild(prevPiece);
      selected = false;
      console.log("Made a move");
    }
  });

  let checkIfValidMove = (targetSpace) => {
    //cant move backwards (different for each player)
    
    //cant move more then one space 

    //cant move on space with a piece
    let blockEmpty = targetSpace.children.length === 0;

    if(blockEmpty)
      return true;
    else {
      console.log("Invalid Move!");
      return false;
    } 
  }

});




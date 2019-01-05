
// Steven Chin & Tzuhsien Liu

// On document loaded init Game
document.addEventListener("DOMContentLoaded", e => {
  let selected = false;
  let prevPiece;
  let game = new Game();
  console.log("Game Started");

  //Select a piece
  document.addEventListener("click", e =>{
    let target = e.target;
    let isPiece = target.classList.contains("piece");

    if (isPiece && !selected) {
      target.classList.toggle("selected");
      prevPiece = target;
      selected = true;
      // console.log("Piece selected");
    } else if (isPiece && selected) {
      target.classList.toggle("selected");
      if(prevPiece !== target){
        prevPiece.classList.remove("selected");
      }
      prevPiece = target;
      selected = true;
      // console.log("Piece selected2");
    }
  });

  //Move the piece
  document.addEventListener("click", e =>{
    let target = e.target;
    let isBlock = target.classList.contains("black");
    if (isBlock && selected) {
      if(prevPiece){
        prevPiece.classList.remove("selected");
      }
      prevPiece.parentNode.removeChild(prevPiece);
      target.appendChild(prevPiece);
      selected = false;
      console.log("Made a move");
    }
  });

});




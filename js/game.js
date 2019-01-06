// Steven Chin & Tzuhsien Liu

class Game extends Board {

  constructor() {
    super(Board);
    this.turn = 0;
  }

  nextTurn() {
    this.turn++;
  }

  getTurn() {
    return this.turn;
  }
    
  checkIfValidMove (targetSpace, piece, selected) {
    //check if player is correct player
    if (this.turn % 2 == 0) {
      if (piece.classList.contains("playerG")) {
        console.log("invalid player G");
        return false;
      }
      else if (piece.classList.contains("playerP")) {
        console.log("valid player P");
      }
    }
    else {
      if (piece.classList.contains("playerG")) {
        console.log("valid player G");
      }
      else if (piece.classList.contains("playerP")) {
        console.log("invalid player P");
        return false;
      }
    }

    if (selected == true) {
      let prevLocation = piece.parentNode.getAttribute("data-location").split(",");
      let newLocation = targetSpace.getAttribute("data-location").split(",");
    }

    if (prevLocation !== null && newLocation !== null) {

      //cant move backwards (different for each player)
      if (piece.classList.contains("playerP")) {
        if (newLocation[0] >= prevLocation[0]) {
          return false;
        }
      }
      else if (piece.classList.contains("playerG")) {
        if (newLocation[0] <= prevLocation[0]) {
          return false;
        }
      }
    }


    //cant move more then one space 

    //cant move on space with a piece
    let blockEmpty = targetSpace.children.length === 0;

    if (blockEmpty) {
      return true;

    } else {
      console.log("Invalid Move!");
      return false;
    } 
  }

}
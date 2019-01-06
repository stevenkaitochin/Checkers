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
        return false;
      }
    }
    else {
      if (piece.classList.contains("playerP")) {
        return false;
      }
    }

    //cant move on space with a piece
    let blockEmpty = targetSpace.children.length === 0;
    if (!blockEmpty) {
      return false;
    }
    
    let prevLocation = piece.parentNode.getAttribute("data-location").split(",");
    let newLocation = targetSpace.getAttribute("data-location").split(",");

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

    // making a jump 
    if (piece.classList.contains("playerP")) {
      if ((prevLocation[0] - newLocation[0] == 2) && (newLocation[1] - prevLocation[1] == 2)) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerP")){
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
        if (newLocation[0] !== 0) {
          if (newLocation[1] === 7) {
            // Check if top left is green
          }
          else if (newLocation[1] === 0) {
            //check if top right is green
          }
          else {
            //check if top left or right is green
          }
        }
      }
      else if ((prevLocation[0] - newLocation[0] == 2) && (prevLocation[1] - newLocation[1] == 2)) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerP")){
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
      }
    }
    else if (piece.classList.contains("playerG")) {
      if ((newLocation[0] - prevLocation[0] == 2) && (prevLocation[1] - newLocation[1] == 2)) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerG")){
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
      }
      else if ((newLocation[0] - prevLocation[0] == 2) && (newLocation[1] - prevLocation[1] == 2)) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerG")){
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
      }
    }
    
    //cant move more then one space 
    if (piece.classList.contains("playerP")) {
      if (prevLocation[0] - newLocation[0] !== 1) {
        return false;
      }
    }
    else if (piece.classList.contains("playerG")) {
      if (newLocation[0] - prevLocation[0] !== 1) {
        return false;
      }
    }

    return true;
  }

  becomeKingPiece (piece) {
    piece.classList.add("king");
    piece.innerHTML = `
      <i class="fab fa-jedi-order"></i>
    `;
  }

}

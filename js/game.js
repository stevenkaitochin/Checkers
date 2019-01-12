// Steven Chin & Tzuhsien Liu

class Game extends Board {
  constructor() {
    super(Board);
    this.turn = 0;
    this.hasMoved = false;
  }

  nextTurn() {
    this.hasMoved = false;
    this.turn++;
  }

  getTurn() {
    return this.turn;
  }

  checkHasMoved() {
    return this.hasMoved;
  }

  checkIfValidMove(targetSpace, piece) {
    //check if player is correct player
    if (this.turn % 2 == 0) {
      if (piece.classList.contains("playerG")) {
        return false;
      }
    } else {
      if (piece.classList.contains("playerP")) {
        return false;
      }
    }

    //cant move on space with a piece
    let blockEmpty = targetSpace.children.length === 0;
    if (!blockEmpty) {
      return false;
    }

    let prevLocation = piece.parentNode
      .getAttribute("data-location")
      .split(",");
    let newLocation = targetSpace.getAttribute("data-location").split(",");

    //cant move backwards (different for each player)
    if (piece.classList.contains("playerP")) {
      if (newLocation[0] >= prevLocation[0]) {
        return false;
      }
    } else if (piece.classList.contains("playerG")) {
      if (newLocation[0] <= prevLocation[0]) {
        return false;
      }
    }

    // making a jump
    if (piece.classList.contains("playerP")) {
      // making a jump to the top right
      if (
        prevLocation[0] - newLocation[0] == 2 &&
        newLocation[1] - prevLocation[1] == 2
      ) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerP")) {
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
        if (this.checkMultiJump("playerP", newLocation, piece) === false) {
          this.hasMoved = true;
          return false;
        }
      }
      // making a jump to the top left
      else if (
        prevLocation[0] - newLocation[0] == 2 &&
        prevLocation[1] - newLocation[1] == 2
      ) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerP")) {
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
        if (this.checkMultiJump("playerP", newLocation, piece) === false) {
          this.hasMoved = true;
          return false;
        }
      }
    } else if (piece.classList.contains("playerG")) {
      // making a jump to the bottom left
      if (
        newLocation[0] - prevLocation[0] == 2 &&
        prevLocation[1] - newLocation[1] == 2
      ) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerG")) {
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
        if (this.checkMultiJump("playerG", newLocation, piece) === false) {
          this.hasMoved = true;
          return false;
        }
      }
      // making a jump to the bottom right
      else if (
        newLocation[0] - prevLocation[0] == 2 &&
        newLocation[1] - prevLocation[1] == 2
      ) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild.classList.contains("playerG")) {
          return false;
        }
        del.removeChild(del.firstElementChild);
        piece.parentNode.removeChild(piece);
        targetSpace.appendChild(piece);
        if (this.checkMultiJump("playerG", newLocation, piece) === false) {
          this.hasMoved = true;
          return false;
        }
      }
    }

    //cant move more then one space
    if (piece.classList.contains("playerP")) {
      if (prevLocation[0] - newLocation[0] !== 1) {
        return false;
      }
    } else if (piece.classList.contains("playerG")) {
      if (newLocation[0] - prevLocation[0] !== 1) {
        return false;
      }
    }

    return true;
  }

  checkMultiJump(player, newLocation, piece) {
    let tempR, tempC;
    let tempR2, tempC2;

    if (player == "playerP") {
      // check if top left can be jumped
      if (Number(newLocation[0]) !== 0 && Number(newLocation[1]) === 7) {
        tempR = Number(newLocation[0]) - 1;
        tempC = Number(newLocation[1]) - 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
          if (tempR != 0 && tempC != 0) {
            tempR2 = tempR - 1;
            tempC2 = tempC - 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerG")) {
              return false;
            }
            return true;
          }
        }
        return false;
      }
      // check if top right can be jumped
      else if (Number(newLocation[0]) !== 0 && Number(newLocation[1]) === 0) {
        tempR = Number(newLocation[0]) - 1;
        tempC = Number(newLocation[1]) + 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
          if (tempR != 0 && tempC != 0) {
            tempR2 = tempR - 1;
            tempC2 = tempC + 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerG")) {
              return false;
            }
            return true;
          }
        }
        return false;
      } 
      //check if top left or right is green
      else if (Number(newLocation[0]) !== 0) {

        let noTopRight = false;
        //top right
        tempR = Number(newLocation[0]) - 1;
        tempC = Number(newLocation[1]) + 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
          if (tempR != 0 && tempC != 0) {
            tempR2 = tempR - 1;
            tempC2 = tempC + 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerG")) {
              noTopRight = true;
            }
          }
        }
        //top left
        if (noTopRight){
          tempR = Number(newLocation[0]) - 1;
          tempC = Number(newLocation[1]) - 1;
          let temp = document.getElementById(tempR + "," + tempC);
          if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
            if (tempR != 0 && tempC != 0) {
              tempR2 = tempR - 1;
              tempC2 = tempC - 1;
              let temp2 = document.getElementById(tempR2 + "," + tempC2);
              if (temp2.firstElementChild.classList.contains("playerG")) {
                
                return false;
              }
              return true;
            }
          }
          return false;
        }
      } 
      //row zero
      else if(Number(newLocation[0]) === 0){
        console.log("KINGG")
        this.becomeKingPiece(piece);
        return false;
      }
    }


  }

  becomeKingPiece(piece) {
    piece.classList.add("king");
    piece.innerHTML = `
      <i class="fab fa-jedi-order"></i>
    `;
  }
}

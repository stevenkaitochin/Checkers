// Steven Chin & Tzuhsien Liu

class Game extends Board {
  constructor() {
    super(Board);
    this.turn = 0;
    this.hasMoved = false;
    this.piece;
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

  getPiece() {
    return this.piece;
  }

  checkCorrectPlayer(piece) {
    if (this.turn % 2 == 0) {
      if (piece.classList.contains("playerG")) 
        return false;
      else 
        return true;
    } 
    else if (this.turn % 2 == 1) {
      if (piece.classList.contains("playerP")) 
        return false;
      else
        return true;
    }
  }

  // Make sure normal piece can't move backwards
  checkBackwardsMove(piece, newLocation, prevLocation) {
    if (piece.classList.contains("playerP")) {
      if (newLocation[0] >= prevLocation[0])
        return false;
      else return true;
    }
    else if (piece.classList.contains("playerG")) {
      if (newLocation[0] <= prevLocation[0])
        return false;
      else return true;
    }
  }

  deletePiece(del, piece, targetSpace, newLocation) {
    del.removeChild(del.firstElementChild);
    piece.parentNode.removeChild(piece);
    targetSpace.appendChild(piece);
  }

  checkMultiJump(del, piece, targetSpace, newLocation) {
    if (this.checkMultiJumpHelper("playerP", newLocation, piece) === false) {
      console.log("got here");
      this.hasMoved = true;
      this.piece = piece;
      return false;
    }
    return true;
  }


  checkIfCanJump(piece, newLocation, prevLocation, targetSpace) {
    if (piece !== null && piece.classList.contains("playerP")) {
      // making a jump to the top right
      if (prevLocation[0] - newLocation[0] == 2 && newLocation[1] - prevLocation[1] == 2) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild !== null && del.firstElementChild.classList.contains("playerP")) 
          return false;
        this.deletePiece(del, piece, targetSpace, newLocation);
        if (!this.checkMultiJump(del, piece, targetSpace, newLocation)) {
          console.log("hi");
          return false;
        }
      }
      // making a jump to the top left
      else if (prevLocation[0] - newLocation[0] == 2 && prevLocation[1] - newLocation[1] == 2) {
        let deleteX = Number(newLocation[0]) + 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild !== null && del.firstElementChild.classList.contains("playerP"))
          return false;
        this.deletePiece(del, piece, targetSpace, newLocation);
        if (!this.checkMultiJump(del, piece, targetSpace, newLocation)) {
          console.log("hi2");
          return false;
        }
      }
    }
    else if (piece !== null && piece.classList.contains("playerG")) {
      // making a jump to the bottom left
      if (newLocation[0] - prevLocation[0] == 2 && prevLocation[1] - newLocation[1] == 2) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) + 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild !== null && del.firstElementChild.classList.contains("playerG"))
          return false;
        this.deletePiece(del, piece, targetSpace, newLocation);
        if (!this.checkMultiJump(del, piece, targetSpace, newLocation)) {
          console.log("hi3");
          return false;
        }
      }
      // making a jump to the bottom right
      else if (newLocation[0] - prevLocation[0] == 2 && newLocation[1] - prevLocation[1] == 2) {
        let deleteX = Number(newLocation[0]) - 1;
        let deleteY = Number(newLocation[1]) - 1;
        let del = document.getElementById(deleteX + "," + deleteY);
        if (del.firstElementChild !== null &&del.firstElementChild.classList.contains("playerG"))
          return false;
        this.deletePiece(del, piece, targetSpace, newLocation);
        if (!this.checkMultiJump(del, piece, targetSpace, newLocation)) {
          console.log("hi4");
          return false;
        }
      }
    }
    return true;
  }

  checkIfValidMove(targetSpace, piece) {
    let prevLocation = piece.parentNode.getAttribute("data-location").split(",");
    let newLocation = targetSpace.getAttribute("data-location").split(",");

    if (!this.checkCorrectPlayer(piece)) return false;

    //cant move on space with a piece
    if (targetSpace.children.length !== 0)
      return false;

    if (!this.checkBackwardsMove(piece, newLocation, prevLocation)) return false;

    if (!this.checkIfCanJump(piece, newLocation, prevLocation, targetSpace)) return false; 

    //cant move more then one space
    if (piece.classList.contains("playerP"))
      if (prevLocation[0] - newLocation[0] !== 1 || Math.abs(prevLocation[1] - newLocation[1]) !== 1)
        return false;
    else if (piece.classList.contains("playerG"))
      if (newLocation[0] - prevLocation[0] !== 1 || Math.abs(newLocation[1] - prevLocation[1]) !== 1)
        return false;

    return true;
  }

  checkMultiJumpHelper(player, newLocation, piece) {
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
            if (temp2.firstElementChild === null) {
              return true;
            }
            return false;
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
            if (temp2.firstElementChild === null) {
              return true;
            }
            return false;
          }
        }
        return false;
      }
      // check if top left or right is green
      else if (Number(newLocation[0]) !== 0) {
        let noTopRight = false;
        // top right
        tempR = Number(newLocation[0]) - 1;
        tempC = Number(newLocation[1]) + 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
          if (tempR != 0 && tempC != 0) {
            tempR2 = tempR - 1;
            tempC2 = tempC + 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild === null) {
              return true;
            }
          }
        }
        noTopRight = true;
        // top left
        if (noTopRight) {
          tempR = Number(newLocation[0]) - 1;
          tempC = Number(newLocation[1]) - 1;
          let temp = document.getElementById(tempR + "," + tempC);
          if (temp.firstElementChild !== null && temp.firstElementChild.classList.contains("playerG")) {
            if (tempR != 0 && tempC != 0) {
              tempR2 = tempR - 1;
              tempC2 = tempC - 1;
              let temp2 = document.getElementById(tempR2 + "," + tempC2);
              if (temp2.firstElementChild === null) {
                return true;
              }
            }
          }
          return false;
        }
      }
      //row zero
      else if (Number(newLocation[0]) === 0) {
        this.becomeKingPiece(piece);
        return false;
      }
    }

    //playerG
    else {
      // check if bottom right can be jumped
      if (Number(newLocation[0]) !== 7 && Number(newLocation[1]) === 0) {
        tempR = Number(newLocation[0]) + 1;
        tempC = Number(newLocation[1]) + 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (
          temp.firstElementChild !== null &&
          temp.firstElementChild.classList.contains("playerP")
        ) {
          if (tempR != 7 && tempC != 7) {
            tempR2 = tempR + 1;
            tempC2 = tempC + 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerP")) {
              return false;
            }
            return true;
          }
        }
        return false;
      }
      // check if bottom left can be jumped
      else if (Number(newLocation[0]) !== 7 && Number(newLocation[1]) === 7) {
        tempR = Number(newLocation[0]) + 1;
        tempC = Number(newLocation[1]) - 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (
          temp.firstElementChild !== null &&
          temp.firstElementChild.classList.contains("playerP")
        ) {
          if (tempR != 7 && tempC != 7) {
            tempR2 = tempR + 1;
            tempC2 = tempC - 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerP")) {
              return false;
            }
            return true;
          }
        }
        return false;
      }
      //check if bottom left or right is green
      else if (Number(newLocation[0]) !== 7) {
        let noBotLeft = false;
        //bottom left
        tempR = Number(newLocation[0]) + 1;
        tempC = Number(newLocation[1]) - 1;
        let temp = document.getElementById(tempR + "," + tempC);
        if (
          temp.firstElementChild !== null &&
          temp.firstElementChild.classList.contains("playerP")
        ) {
          if (tempR != 7 && tempC != 7) {
            tempR2 = tempR + 1;
            tempC2 = tempC - 1;
            let temp2 = document.getElementById(tempR2 + "," + tempC2);
            if (temp2.firstElementChild.classList.contains("playerP")) {
              noBotLeft = true;
            }
          }
        }
        // bottom right 
        if (noBotLeft) {
          tempR = Number(newLocation[0]) + 1;
          tempC = Number(newLocation[1]) + 1;
          let temp = document.getElementById(tempR + "," + tempC);
          if (
            temp.firstElementChild !== null &&
            temp.firstElementChild.classList.contains("playerP")
          ) {
            if (tempR != 7 && tempC != 7) {
              tempR2 = tempR + 1;
              tempC2 = tempC + 1;
              let temp2 = document.getElementById(tempR2 + "," + tempC2);
              if (temp2.firstElementChild.classList.contains("playerP")) {
                return false;
              }
              return true;
            }
          }
          return false;
        }
      }
      //row zero
      else if (Number(newLocation[0]) === 7) {
        this.becomeKingPiece(piece);
        return false;
      }
    }
  }

  becomeKingPiece(piece) {
    piece.classList.add("king");
    piece.innerHTML = `<i class="fab fa-jedi-order"></i>`;
  }
}

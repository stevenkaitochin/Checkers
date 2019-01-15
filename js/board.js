// Steven Chin and Tzuhsien Liu

class Board {
  constructor() {
    this.loadBoard();
    this.loadPieces();
  }

  resetBoard () {
    this.loadBoard();
    this.loadPieces();
  }

  //create game board
  loadBoard() {
    let board = document.getElementById("board");
    let markup = ``;
    for (let i = 0; i < 8; i++) {
      markup += `<div class="row"> `;
      for (let j = 0; j < 8; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            markup += ` <div class="block red" data-location="${i},${j}"> </div> `;
          } else {
            markup += ` <div id="${i},${j}" class="block black" data-location="${i},${j}"> </div> `;
          }
        } else {
          if (j % 2 === 0) {
            markup += ` <div id="${i},${j}" class="block black" data-location="${i},${j}"> </div> `;
          } else {
            markup += ` <div class="block red data-location="${i},${j}"></div> `;
          }
        }
      }
      markup += ` </div> `;
    }
    board.innerHTML = markup;
  };
  
  //load game pieces
  loadPieces() {
    let blackSpaces = document.querySelectorAll(".black");   

    blackSpaces.forEach((space, index) => {
      let location = space.getAttribute("data-location").split(",");
      let piece1 = `<div id="piece${index}"class="piece playerG"> </div>`;
      let piece2 = `<div id="piece${index}"class="piece playerP"> </div>`;
      if (Number(location[0]) < 3) {      
        space.innerHTML = piece1;
      } else if (Number(location[0]) > 4){
        space.innerHTML = piece2;
      }
    });
  }

}
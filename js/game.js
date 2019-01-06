
class Game extends Board {
  constructor (){
    super(Board);
    this.turn = 0;
  }

  getTurn () {
    return this.turn;
  }



}



export function generateMovables(piece_positions: string[][]): string[][] {
    let movable_positions = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""]
    ];

    
    for(let i = 0; i < 8 ; i++){
      for(let j = 0; j < 8; j++){

        let pieceId = piece_positions[i][j];

        //Pawn movables:
        if(pieceId[1] === "p"){
          //Black Pawns:
          if(pieceId[0] === "B"){
            if(piece_positions[i-1][j] === ""){
              movable_positions[i-1][j] += " " +  pieceId;
              
              //Initial 2 steps for black:
              if(i === 6 && piece_positions[i-2][j] === ""){
                movable_positions[i-2][j] += " " +  pieceId;
              }
            }
            //Black pawn kills
            if(piece_positions[i-1][j-1]){ 
              if(piece_positions[i-1][j-1][0] === "W"){
                movable_positions[i-1][j-1] += " " +  pieceId;
              }
            }
            if(piece_positions[i-1][j+1]){
              if(piece_positions[i-1][j+1][0] === "W"){
                movable_positions[i-1][j+1] += " " +  pieceId;
              }
            }
          }


          //White pawns
          if(pieceId[0] === "W"){
            if(piece_positions[i+1][j] === ""){
              movable_positions[i+1][j] += " " +  pieceId;
              //Initial 2 steps for white:
              if(i === 1 && piece_positions[i+2][j] === ""){
                movable_positions[i+2][j] += " " +  pieceId;
              }
            }

            //White pawn kills
            if(piece_positions[i+1][j-1]){ 
              if(piece_positions[i+1][j-1][0] === "B"){
                movable_positions[i+1][j-1] += " " +  pieceId;
              }
            }
            if(piece_positions[i+1][j+1]){
              if(piece_positions[i+1][j+1][0] === "B"){
                movable_positions[i+1][j+1] += " " +  pieceId;
              }
            }
          }
        }
        
        //Bishops & Part Queen
        if(pieceId[1] === "b" || pieceId[1] === "q"){
          let ul = 1, ur = 1, dl = 1, dr = 1;
          for(let r = 1; (i - r >= 0)||(r + i < 8)||(j - r >= 0)||(r + j < 8); r++){
            if(i - r < 0){ul = 0; ur = 0;}
            if(r + i >= 8){dl = 0; dr = 0;}
            if(j - r < 0){ul = 0; dl = 0;}
            if(r + j >= 8){ur = 0; dr = 0;}

            if(ul){
              if(piece_positions[i - r][j - r] === ""){
                movable_positions[i - r][j - r] += " " +  pieceId;
              }
              else{
               ul = 0;
               if(piece_positions[i - r][j - r][0] !== pieceId[0]){
                movable_positions[i - r][j - r] += " " +  pieceId;
               } 
              }
            }
            if(ur){
              if(piece_positions[i - r][j + r] === ""){
                movable_positions[i - r][j + r] += " " +  pieceId;
              }
              else{
               ur = 0;
               if(piece_positions[i - r][j + r][0] !== pieceId[0]){
                movable_positions[i - r][j + r] += " " +  pieceId;
               } 
              }
            }
            if(dl){
              if(piece_positions[i + r][j - r] === ""){
                movable_positions[i + r][j - r] += " " +  pieceId;
              }
              else{
               dl = 0;
               if(piece_positions[i + r][j - r][0] !== pieceId[0]){
                movable_positions[i + r][j - r] += " " +  pieceId;
               } 
              }
            }
            if(dr){
              if(piece_positions[i + r][j + r] === ""){
                movable_positions[i + r][j + r] += " " +  pieceId;
              }
              else{
               dr = 0;
               if(piece_positions[i + r][j + r][0] !== pieceId[0]){
                movable_positions[i + r][j + r] += " " +  pieceId;
               } 
              }
            }

          }
        }

        //Knights
        if(pieceId[1] === "n"){
          for(let x = -2; x < 3; x+=4){
            for(let y = -1; y < 2; y+=2){
              if(i+x < 8 && i+x >= 0 && j+y < 8 && j+y >= 0){
                if(piece_positions[i+x][j+y] === ""){
                  movable_positions[i+x][j+y] += " " +  pieceId;
                }
                else{
                  if(piece_positions[i+x][j+y] !== pieceId[0]){
                    movable_positions[i+x][j+y] += " " +  pieceId;
                  }
                }
              }
            }
          }

          for(let y = -2; y < 3; y+=4){
            for(let x = -1; x < 2; x+=2){
              if(i+x < 8 && i+x >= 0 && j+y < 8 && j+y >= 0){
                if(piece_positions[i+x][j+y] === ""){
                  movable_positions[i+x][j+y] += " " +  pieceId;
                }
                else{
                  if(piece_positions[i+x][j+y][0] !== pieceId[0]){
                    movable_positions[i+x][j+y] += " " +  pieceId;
                    console.log("Added ", pieceId, "killing at: ", i+x, j+y, "Because", piece_positions[i+x][j+y]);
                  }
                }
              }
            }
          }
          
          
        }

        //Rooks & Rest of Queen
        if(pieceId[1] === "r" || pieceId[1] === "q"){
          let flag = 1;
          for(let x = 1; x + i < 8; x++){
            if(piece_positions[i + x][j] === ""){
              movable_positions[i + x][j] += " " +  pieceId;
            }
            else{
              if(piece_positions[i + x][j][0] !== pieceId[0]){
                movable_positions[i + x][j] += " " +  pieceId;
              }
              break;
            }
          }
          for(let x = -1; x + i >= 0; x--){
            if(piece_positions[i + x][j] === ""){
              movable_positions[i + x][j] += " " +  pieceId;
            }
            else{
              if(piece_positions[i + x][j][0] !== pieceId[0]){
                movable_positions[i + x][j] += " " +  pieceId;
              }
              break;
            }
          }
          //Left-right is a little messed up at the moment

          for(let x = 1; x + j < 8; x++){
            if(piece_positions[i][j + x] === ""){
              movable_positions[i][j + x] += " " +  pieceId;
            }
            else{
              if(piece_positions[i][j + x][0] !== pieceId[0]){
                movable_positions[i][j + x] += " " +  pieceId;
              }
              break;
            }
          }
          for(let x = -1; x + i >= 0; x--){
            if(piece_positions[i][j + x] === ""){
              movable_positions[i][j + x] += " " +  pieceId;
            }
            else if(piece_positions[i][j + x]){
              if(piece_positions[i][j + x][0] !== pieceId[0]){
                movable_positions[i][j + x] += " " +  pieceId;
              }
              break;
            }
          }
        }

        //King
        if(pieceId[1] === "k"){
          let otherPlayer = ( pieceId[0] === "W" )?"B": "W";
          for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
              if((i+x < 8) && (i+x > 0) && (j+y < 8) && (j+y > 0)){
                if((piece_positions[i+x][j+y] === "") && (!movable_positions[i+x][j+y].includes(otherPlayer))){
                  console.log(movable_positions[i+x][j+y].includes(otherPlayer));
                  movable_positions[i+x][j+y] += " " +  pieceId;
                }
                else if((piece_positions[i+x][j+y][0] !== pieceId[0]) && (!movable_positions[i+x][j+y].includes(otherPlayer))){
                  movable_positions[i+x][j+y] += " " +  pieceId;
                }
              }
            }
          }
        }
      }
    }

//    console.log("From function: ", movable_positions);

    return movable_positions;
  }

  export function checkMovability(piece_positions: string[][], initialPos: { x: number; y: number; }, finalPos: { x: number; y: number; }, movable_positions: string[][]) {
    
    let pieceID = piece_positions[initialPos.y][initialPos.x];
    
//    console.log( "This player is: ", pieceID );
//    console.log( "At final position: ", movable_positions[finalPos.y][finalPos.x] );
//    console.log( "Can move? ", movable_positions[finalPos.y][finalPos.x].includes(pieceID) );

    if (movable_positions[finalPos.y][finalPos.x].includes( pieceID) ){

      let pieces = new Array(8);
      for(let i = 0; i < 8; i++){
        pieces[i] = new Array(8);
        for(let j = 0; j < 8; j++){
          
          if(i === initialPos.y && j === initialPos.x){
            pieces[i][j] = "";
          }
          else if((i === finalPos.y) && (j === finalPos.x)) {
            pieces[i][j] = pieceID;
          }
          else{
            pieces[i][j] = piece_positions[i][j];
          }
        }
      }

      console.log("Mover: ", pieceID[0]);
      movable_positions = generateMovables(pieces);

      let kingPositions = findKings(piece_positions);
      //console.log("At black king: ",movable_positions[kingPositions.xb][kingPositions.yb], "At white king: ", movable_positions[kingPositions.xw][kingPositions.yw]);
      
      if(movable_positions[kingPositions.xb][kingPositions.yb].includes(" W")){

        alert("White checks black!");
        
        if(piece_positions[initialPos.x][initialPos.y][0] !== "W"){
          alert("Don't suicide!");
          return 0;
        }
        let kingX = kingPositions.xb;
        let kingY = kingPositions.yb;
        let endGameCheck = checkCheckMate(piece_positions, {x: kingX, y: kingY}, movable_positions);
        console.log("Check-mate checker: ", endGameCheck);
        if(endGameCheck){
          alert("Check-mate!");
          return 2;
        }
        return 1;
      }

      if(movable_positions[kingPositions.xw][kingPositions.yw].includes(" B")){

        alert("Black checks white!");
        
        if(pieceID[0]!== "B"){
          alert("Don't suicide!");
          return 0;
        }

        let kingX = kingPositions.xw;
        let kingY = kingPositions.yw;
        let endGameCheck = checkCheckMate(piece_positions, {x: kingX, y: kingY}, movable_positions);
        console.log("Check-mate checker: ", endGameCheck);
        if(endGameCheck){
          alert("Check-mate!");
          return 2;
        }

        return 1;
      }

      return 1;
    }

    return 0;
  }

function checkCheckMate(piece_positions: string[][], kingPos : { x: number, y : number}, movable_positions : string[][]) : number{
  let kingId = piece_positions[kingPos.x][kingPos.y];
  let otherPlayer = ( kingId[0] === "W" )?"B": "W";
  let kingMove = false;

  for(let i = 0; (i < 8) && (!kingMove); i++){
    for(let j = 0; (j < 8) && (!kingMove); j++){
      if(movable_positions[i][j].includes(kingId) && !movable_positions[i][j].includes(" " + otherPlayer)){
        console.log(movable_positions[i][j], movable_positions[i][j].includes(" " + otherPlayer))
        kingMove = true;
      }
    }
  }
  console.log("Can king move?", kingMove);
  if(kingMove){
    return 0;
  }
  let checkedBy = movable_positions[kingPos.x][kingPos.y].split(" ");
  
  console.log("Checked by: ", checkedBy);
  let checkPlayerPos : {x : number, y : number};
  for(let i = 1; i < checkedBy.length; i++){
    checkPlayerPos = findPieceById(piece_positions, checkedBy[i]);
    //If checked by pawn:
    if(checkedBy[i][1] === "p"){

    }
  }
  
  return 1;
}

function findKings(piece_positions: string[][]): { xb: number; yb: number; xw: number; yw: number; } {
  let pos : { xb: number; yb: number; xw: number; yw: number; } = {xb : -1, yb : -1, xw : -1, yw : -1};
  for(let i = 0; i < 8; i ++){
    for(let j = 0; j < 8; j++){

      if(piece_positions[i][j]){
        if(piece_positions[i][j][1] === "k"){

          switch(piece_positions[i][j][0]){
            case "W":{
              pos.xw = i;
              pos.yw = j;
              break;
            }
            case "B":{
              pos.xb = i;
              pos.yb = j;
              break;
            }
          }

        }
      }

    }
  }
  return pos;
}
function findPieceById(piece_positions: string[][], arg1: string) {
  let x = -1, y = -1;
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      if(piece_positions[i][j] === arg1){
        x = i;
        y = j;
      }
    }
  }
  return {x : x, y : y};
}


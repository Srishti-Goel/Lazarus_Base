import React, { useRef } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard/ChessBoard';
import  { generateMovables, checkMovability } from './components/ChessBoard/Referee';

//Set the opening please, or drop pieces

let activePiece : HTMLElement | null;
let initialPos : {x : number, y : number} | null;

class App extends React.Component<AppProps, AppState> {
  state = { 
    lastPlayed : "None",
    pieces_data : [
      {id : "Bp1", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp2", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp3", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp4", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp5", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp6", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp7", image_src : "assests/images/black_pawn.jpeg"},
      {id : "Bp8", image_src : "assests/images/black_pawn.jpeg"},
    
      {id : "Bn1", image_src : "assests/images/black_knight.jpeg"},
      {id : "Bn2", image_src : "assests/images/black_knight.jpeg"},
    
      {id : "Bb1", image_src : "assests/images/black_bishop.jpeg"},
      {id : "Bb2", image_src : "assests/images/black_bishop.jpeg"},
    
      {id : "Br1", image_src : "assests/images/black_rook.jpeg"},
      {id : "Br2", image_src : "assests/images/black_rook.jpeg"},
    
      {id : "Bq1", image_src : "assests/images/black_queen.jpeg"},
      {id : "Bk1", image_src : "assests/images/black_king.jpeg"},
    
    
      {id : "Wp1", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp2", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp3", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp4", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp5", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp6", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp7", image_src : "assests/images/white_pawn.jpeg"},
      {id : "Wp8", image_src : "assests/images/white_pawn.jpeg"},
    
      {id : "Wn1", image_src : "assests/images/white_knight.jpeg"},
      {id : "Wn2", image_src : "assests/images/white_knight.jpeg"},
    
      {id : "Wb1", image_src : "assests/images/white_bishop.jpeg"},
      {id : "Wb2", image_src : "assests/images/white_bishop.jpeg"},
    
      {id : "Wr1", image_src : "assests/images/white_rook.jpeg"},
      {id : "Wr2", image_src : "assests/images/white_rook.jpeg"},
    
      {id : "Wq1", image_src : "assests/images/white_queen.jpeg"},
      {id : "Wk1", image_src : "assests/images/white_king.jpeg"},
    ],
    piece_positions : [
      ["Wr1", "Wn1", "Wb1", "Wq1", "Wk1", "Wb2", "Wn2", "Wr2"],
      ["Wp1", "Wp2", "Wp3", "Wp4", "Wp5", "Wp6", "Wp7", "Wp8"], // 0,0 element = a1
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Bp1", "Bp2", "Bp3", "Bp4", "Bp5", "Bp6", "Bp7", "Bp8"],
      ["Br1", "Bn1", "Bb1", "Bq1", "Bk1", "Bb2", "Bn2", "Br2"]
    ],
    movable_positions : [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""]
    ]
  }
  render( ) { 
    return ( 
      <ChessBoard 
        grabPiece = {this.grabPiece}
        movePiece = {this.movePiece}
        dropPiece = {this.dropPiece}
        pieces_positions = {this.state.piece_positions}
        sources = {this.state.pieces_data}
      /> 
    );
  }

  grabPiece = ( e : React.MouseEvent) => {
    const element = e.target as HTMLElement;
    if( element.classList.contains( "chess_piece_div")){
      //console.log( "Clickeed!", element);

      element.style.zIndex = "100";
      console.log("Z-index: ", element.style.zIndex);
      element.style.position = "absolute";
      const x = e.clientX;
      const y = e.clientY;
  
      initialPos = {x : Math.floor( x/100), y : Math.floor( y/100)};
      console.log( "Attacking positions: ", this.state.movable_positions);
      console.log( "Moving from: ", initialPos);
      element.style.left = `${x - 50}px`;
      element.style.top = `${y - 50}px`;

      this.state.movable_positions = generateMovables( this.state.piece_positions);
  
      activePiece = element;
    }
    else{
      console.log( "Empty square!", element);
    }
    
  }

  movePiece( e : React.MouseEvent){
    if( activePiece && activePiece.classList.contains( "chess_piece_div")){
          if( activePiece && activePiece.classList.contains( "chess_piece_div")){
            const x = e.clientX;
            const y = e.clientY;
            activePiece.style.left =`${x - 50}px`;
            activePiece.style.top =`${y - 50}px`;
          }
    }
  }

  dropPiece = ( e: React.MouseEvent): void => {
    if( activePiece && initialPos){
      let playerColor = this.state.piece_positions[initialPos.y][initialPos.x][0];
      console.log( "Player: ", playerColor, "Played piece with ID: ", this.state.piece_positions[initialPos.y][initialPos.x]);
      if( playerColor !== this.state.lastPlayed && (this.state.lastPlayed === 'None'? playerColor === "W" : 1)){
        const x = e.clientX;
        const y = e.clientY;
        let finalPos :{x: number, y : number} | null= {x : ( Math.floor( x/100)), y : ( Math.floor( y/100))};
        let pieceID = this.state.piece_positions[initialPos.y][initialPos.x];

        if( checkMovability( this.state.piece_positions, initialPos, finalPos, this.state.movable_positions ) ){
          activePiece.style.top =`${( ( finalPos.y) * 100)}px` ;
          activePiece.style.left =`${( ( finalPos.x) *100)}px` ;

          console.log( 'Moved to: ', finalPos); 
          
          
          
          if( this.state.piece_positions[finalPos.y][finalPos.x] !== ""){
            let killedPieceID = this.state.piece_positions[finalPos.y][finalPos.x];
            console.log( "Must KILL ", "piece_" + killedPieceID);
            document.getElementById( "piece_" + killedPieceID)?.style.removeProperty( "background-image");
          }
          this.state.piece_positions[finalPos.y][finalPos.x] = pieceID;
          this.state.piece_positions[initialPos.y][initialPos.x] = "";

          this.state.lastPlayed = playerColor;

          console.log( this.state.piece_positions);

          finalPos = null;
        }
        else{
          activePiece.style.top =`${( ( initialPos.y) * 100)}px` ;
          activePiece.style.left =`${( ( initialPos.x) *100)}px` ;
          //alert( "Can't move there!!!");
        }

      }
        else{
          activePiece.style.top =`${( ( initialPos.y) * 100)}px` ;
          activePiece.style.left =`${( ( initialPos.x) *100)}px` ;
          alert( "Let the other guy play!!");
        }
      const ele = e.target as HTMLElement;
      ele.style.zIndex = "40";
      activePiece = null;
      initialPos = null;
    }
  }
}
export interface AppProps{};
export interface AppState{};
export default App;




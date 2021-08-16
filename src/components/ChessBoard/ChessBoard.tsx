import * as React from 'react';
import { Component } from 'react';
import './ChessBoard.css';
import Tile from '../Tile/Tile';
import Pieces from '../../dataTypes/Pieces';

export interface ChessBoardProps {
    grabPiece: any,
    movePiece: any,
    dropPiece: any,
    pieces_positions: any,
    sources: any
}
 
export interface ChessBoardState {
    
}
 
class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    state = {}
    render() { 
        let board = [];
        for(let i = 0; i < 8; i ++){
            for(let j = 0; j < 8; j++){
                let key = `${i} ${j}`;
                if(this.props.pieces_positions[i][j] === ""){
                    board.push(<Tile key = {key} id = {key} image_scr = "" ele_id = ""/>);
                }
                else{
                    let img_src = this.findImageSource(this.props.pieces_positions[i][j]);
                    let ele_id_src = this.props.pieces_positions[i][j];
                    //console.log("Pushing: ", `${i}, ${j}`, "with : ", img_src);
                    board.push(<Tile key = {key} id = {key}  image_scr = {img_src} ele_id = {ele_id_src}/>);
                }
            }
        }
        return ( 
            <div 
                id = "chessBoard" 
                onMouseDown = {this.props.grabPiece}
                onMouseMove = {this.props.movePiece}
                onMouseUp = {this.props.dropPiece}
            >
                {board}
            </div> 
        );
    }
    findImageSource(id_to_find: string) {
        let pieces = this.props.sources;
        //console.log(pieces);
        let src = "";
        for( let i = 0; i < pieces.length; i++){
            if(pieces[i].id === id_to_find){
                src = pieces[i].image_src;
            }
        }
        return src;
    }
}
 
export default ChessBoard;
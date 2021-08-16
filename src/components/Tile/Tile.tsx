import * as React from 'react';
import './Tile.css';

export interface TileProps {
    key : String,
    id : String,
    image_scr : string;
    ele_id : string;
}
 
export interface TileState {
    
}
 
class Tile extends React.Component<TileProps, TileState> {
    state = {   }
    render() { 
        //console.log("Got: ",this.props.image_scr, "at id : ", this.props.id);
        let clName = "tile ";
        clName = this.getClassName(this.props.id);
        if(this.props.image_scr !== ""){
            //console.log("piece_" + this.props.ele_id, this.props.image_scr);
            return(
                <div className = {clName}>
                    <div id = { "piece_" + this.props.ele_id } className = "chess_piece_div" style={{ backgroundImage: `url(${this.props.image_scr})` }}>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className = {clName}>
                    
                </div>
            );
        }
    }
    getClassName(id: String): string {
        let cn = "tile ";
        let n = parseInt(id[0]) + parseInt(id[2]);
        if(n % 2 === 0){
            cn = cn + "tile_black";
        }
        else{
            cn = cn + "tile_white";
        }
        return cn;
    }
}
 
export default Tile;
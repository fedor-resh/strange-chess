import classNames from "classnames";
import {chessmanDescriptions} from "./classes/ChessmanDescriptions.js";

export function ChessmanCard({chessman}){
    const {name, lore} = chessmanDescriptions[chessman?.type] || {};
    return <div className={classNames('chessman_card', {
        show: chessman
    })}>
        <img src={chessman?.img} alt={chessman?.name}/>
        <h1>{name}</h1>
        <hr style={{width: '100%'}}/>
        <p>{lore}</p>
    </div>
}
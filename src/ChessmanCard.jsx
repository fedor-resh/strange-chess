import classNames from "classnames";

export function ChessmanCard({chessman}){

    return <div className={classNames('chessman_card', {
        show: chessman
    })}>
        <img src={chessman?.image} alt={chessman?.name}/>
        <h1>{chessman?.type}</h1>
    </div>
}
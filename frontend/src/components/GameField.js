import React from "react";
// import { Link } from "react-router-dom";

const CellItem = ({cell}) => {
    return (
        <li className="cell-item" data-x={cell.xCoordinate} data-y={cell.yCoordinate}>
             {`${cell.xCoordinate}x${cell.yCoordinate}`}
        </li>
    )
}

const ShipItem = (ship) => {
    return (
        <li>
           
        </li>
    )
}

const GameField = ({setState, myShips, myCells, hitCell, gameName, createGame}) => {
    return (
        <div className="game-field">
            <div className="field-1">
                <p>field1</p>
                <textarea id='text1'></textarea><br/>
                {myCells ? <ul className="cell-list">
                {myCells.map((cell_) => <CellItem cell={cell_}/>)} 
                </ul> : null}
            </div>
            <div className="field-2">
                <p>field2</p>
                <textarea id='text2'></textarea><br/> 
                {myCells ? <ul className="cell-list">
                {myCells.map((cell_) => <CellItem cell={cell_}/>)} 
                </ul> : null}
            </div>
            <div className="field-3">
                <button  id='get' onClick={() => createGame()}>GAME</button><br/>
                <button id='put' onClick={() => hitCell(1)}>PUT1</button><br/>
                {true ? <label>{`Created game with name: ${gameName}`}</label> : null}<br/>
                <textarea id='text'></textarea><br/>          
                
                {/* <button id='clear' onClick={() => setState({
                    'currentGameName': '' */}
                {/* })}>clear</button> */}
                
            </div>
            
        </div>
    )
};

export default GameField;
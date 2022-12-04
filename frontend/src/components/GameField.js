import { React } from "react";
// import { Link } from "react-router-dom";

const letters = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];




// const CellItem = ({cell}) => {
//     return (
//         <li className="cell-item" data-x={cell.xCoordinate} data-y={cell.yCoordinate}>
//              {`${cell.yCoordinate}`}
//         </li>
//     )
// }

// const ShipItem = (ship) => {
//     return (
//         <li>
           
//         </li>
//     )
// }

const GameField = ({setState, myShips, myCells, hitCell, gameName, createGame}) => {
    
    const cellElements = []
    let cKeys = 0;  
    if (myCells){
        
        let number = 1;
        for (const cell of myCells) {
            
            if (cell.yCoordinate === 1) {
                cellElements.push(<li className="cell-item" key={cKeys++}>{number++}</li>);
            
            }
            cellElements.push(<li className="cell-item" data-x={cell.xCoordinate} 
                                                        data-y={cell.yCoordinate} 
                                                        key={cKeys++}>{''}</li>);            
        }
    }

    let shipElements = []
    if (myShips) {
        let keys = 0;

        shipElements = myShips.map((ship_) => <li   data-type={ship_.shipType} 
                                                    className="fr-ship ship" 
                                                    key={keys++}>{ship_.shipType}</li>)
        // for (const ship of myShips) {            
        //     shipElements.push(<li className="fr-ship" key={keys++}>{ship.ship_type}</li>)
        // }
    }

    return (
        <div className="game-field">
            <div className="field-1">
                <p>field1</p>
                <textarea id='text1'></textarea><br/>
                <ul className="cell-list">
                    {letters.map((letter_) => <li className="cell-item" key={cKeys++}>{letter_}</li>)}                
                    {cellElements}
                </ul>
                <ul className="ship-list">
                    {shipElements}
                </ul>
            </div>
            <div className="field-2">
                <p>field2</p>
                <textarea id='text2'></textarea><br/> 
                <ul className="cell-list">
                    {letters.map((letter_) => <li className="cell-item" key={cKeys++}>{letter_}</li>)}
                    {cellElements} 
                </ul>
                <ul className="ship-list">
                    {shipElements}
                </ul>
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
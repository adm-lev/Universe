import { React, useEffect } from "react";
// import { Link } from "react-router-dom";
import { helpText, shipShuffle } from "./DOMmechanics";


const letters = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


const GameField = ({ createGame, state}) => {
    
    

    useEffect(()=>{
        helpText()
        // chosingMode(state)
    });

    // const shipChoose = (e) => {
    //         console.log('choose!')
    // };

    const frCellElements = [];
    const enCellElements = [];
    // let shipElements = [];
    // const shipsReady = {};
    let cKeys = 0;  
    if (state.myCells){
        
        let number = 1;
        for (const cell of state.myCells) {
            
            if (cell.yCoordinate === 1) {
                frCellElements.push(<li className="cell-item" key={cKeys++}>{number}</li>);
                enCellElements.push(<li className="cell-item" key={cKeys++}>{number++}</li>);
            
            }
            frCellElements.push(<li className="cell-item fr-tl" data-x={cell.xCoordinate} 
                                                        data-y={cell.yCoordinate} 
                                                        key={cKeys++}>{''}</li>); 
            enCellElements.push(<li className="cell-item en-tl" data-x={cell.xCoordinate} 
                                                        data-y={cell.yCoordinate} 
                                                        key={cKeys++}>{''}</li>);            
        }
    }

    for (const ship of state.myShips) {
        state.shipsReady[ship.id] = false;
    }
    
    // if (state.myShips) {
    //     let keys = 0;
    //     shipElements = state.myShips.map((ship_) => <option   data-type={ship_.shipType} 
    //                                                 className="fr-ship ship" 
    //                                                 key={keys++}
    //                                                 value={ship_.id}
    //                                                 >{ship_.shipType}</option>)      
    // }

    return (
        <div className="game-field">
            <div className="field-1">
                <p>field1</p>
                <textarea id='text1'></textarea><br/>
                <ul className="fr-cell-list">
                    {letters.map((letter_) => <li className="cell-item" key={cKeys++}>{letter_}</li>)}                
                    {frCellElements}
                </ul>
                {/* <ul className="ship-list">
                    {shipElements}
                </ul> */}
                {/* <select className="fr-ship-list" onChange={(e)=>shipChoose(e, state)}>
                
                    {shipElements}
                </select> */}
            </div>
            <div className="field-3">
                <button  id='get' onClick={() => createGame()}>GAME</button><br/>
                <button id="shuffle" onClick={()=>shipShuffle(state)}>SHUFFLE</button>
                <button id='ok' >OK</button><br/>
                
                {true ? <label>{`Created game with name: ${state.currentGameName}`}</label> : null}<br/>
                <textarea id='text'></textarea><br/>          
                <label id="help"></label><br/>
                <label id="ship-status"></label>
                
               
                {/* <button id='clear' onClick={() => setState({
                    'currentGameName': '' */}
                {/* })}>clear</button> */}
                
            </div>
            <div className="field-2">
                <p>field2</p>
                <textarea id='text2'></textarea><br/> 
                <ul className="en-cell-list">
                    {letters.map((letter_) => <li className="cell-item" key={cKeys++}>{letter_}</li>)}
                    {enCellElements} 
                </ul>
                {/* <select className="ship-list">
                    {shipElements}
                </select> */}
            </div>           
            
        </div>
    )
};

export default GameField;
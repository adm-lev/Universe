import React from "react";
// import { Link } from "react-router-dom";


const GameField = ({clearCell, getCell, hitCell, gameName}) => {
    return (
        <div>
            <button  id='get' onClick={() => getCell()}>GET</button>
            <button id='put' onClick={() => hitCell(1)}>PUT1</button>
            <textarea id='text'>{gameName}</textarea>
            {true ? <label>{`Created game with name: ${gameName}`}</label> : null}
            
            {/* <button id='clear' onClick={() => console.log(gameName)}>clear</button> */}
        </div>
    )
};

export default GameField;
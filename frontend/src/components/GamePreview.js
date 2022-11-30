import React from "react";





const GameItem = ({clearCell, getCell, hitCell}) => {
    return (
        <div>
            <button  id='get' onClick={() => getCell()}>GET</button>
            <button id='put' onClick={() => hitCell(1)}>PUT1</button>
            <button id='put' onClick={() => hitCell('2')}>PUT2</button>
            <button id='put' onClick={() => hitCell(3)}>PUT3</button>
            <button id='put' onClick={() => hitCell(4)}>PUT4</button>
            <button id='put' onClick={() => hitCell(5)}>PUT5</button>
            <button id='put' onClick={() => hitCell(6)}>PUT6</button>
            <button id='put' onClick={() => hitCell(7)}>PUT7</button>
            <button id='put' onClick={() => hitCell(8)}>PUT8</button>

            <textarea id='text'></textarea>
            <button id='clear' onClick={() => clearCell()}>clear</button>
            
        </div>
        )
};


export default GameItem;
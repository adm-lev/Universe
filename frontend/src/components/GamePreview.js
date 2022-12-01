import React from "react";
import { Link } from "react-router-dom";





const GameItem = ({clearCell, getCell, hitCell, createGame, isAuth}) => {
    return (
        <div>



            <button  id='get' onClick={() => getCell()}>GET</button>
            <button id='put' onClick={() => hitCell(1)}>PUT1</button>
            

            <textarea id='text'></textarea>
            <button id='clear' onClick={() => clearCell()}>clear</button>
            {/* <button id='create' onClick={() => createGame()}>Create new game</button> */}
            {isAuth() ? <button id='create' onClick={() => createGame()}>
                            Create new game
                        </button > : <Link to="/login">Log in befoe create game</Link>}
            
        </div>
        )
};


export default GameItem;
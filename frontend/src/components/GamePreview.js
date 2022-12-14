import React from "react";
import { Link, Navigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
// import { Redirect } from "react-router";



// const [state, setState] = setState({ redirect: True })

//   // достаточно поменять значение state
//   // что бы произошел redirect

//   if (state.redirect) {
//     return <Redirect push to="field" />
//   }


const GamePreview = ({createGame, isAuth, gameName}) => {
    return (
        <div className="game-preview">            
               
            

            
            {isAuth() ? <button id='create' onClick={() => createGame()}>
                            Create new game
                        </button > : <Link to="/login">Log in before create game</Link>}   
                        <Link to='field'>to field!</Link>  
                        {gameName ? <Navigate push to="field"/> : null}       
        </div>
        )
};


export default GamePreview;
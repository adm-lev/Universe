import React from "react";

const GreetingsBlock = (({greetings}) => {
    return (
        <div className="greetings container">
            <p>{greetings}</p>
        </div>
    )
});

export default GreetingsBlock;
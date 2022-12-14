import React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            'login': '',
            'password': '',
        };
    }

    handleChange (event) {
        this.setState ({            
            [event.target.name]: event.target.value        
    });
    }

    handleSubmit (event) {
        this.props.getToken(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return(

            

            <form className="login-form" onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login" autoFocus
                    value={this.state.login} onChange={(event) => this.handleChange(event)}/>
                <input type="password" name="password" placeholder="password"
                    value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                <input type="submit" value="Login"/>
                {this.props.isAuth() ? <Navigate push to="/game"/> : null}
            </form>
        );
    }
}

export default LoginForm;
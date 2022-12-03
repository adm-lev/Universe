import './App.css';
import React from 'react';
import FooterBlock from './components/Footer';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom'
import NotFound404 from './components/NotFound404';
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie';
import banners from './components/banners';
import GreetingsBlock from './components/Greetings';
import GamePreview from './components/GamePreview';
import GameField from './components/GameField';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {          
      'footer': [],
      'aboutMe': '',      
      // 'accessToken': '',
      // 'refreshToken': '',
      'token': '',
      'loggedAs': '',
      'currentGameId': '',
      'currentGameName': '',
      // 'baseUrl': 'http://localhost:8001/api',      
      'baseUrl': 'https://devlev22.de:8043/api',
    };
  }

  

// ********************Authentication*************************************

  logout () {
    this.setToken('');
    this.setState({     
      'loggedAs': '',      
    })
  }

  isAuth () {                              
    // return !!this.state.accessToken;    
    return !!this.state.token;    
  }

  setToken (token, username) {      
    const cookies = new Cookies();
    // cookies.set('accessToken', token['access']);
    // cookies.set('refreshToken', token['refresh']);

    cookies.set('loggedAs', username);
    cookies.set('token', token);    
    this.setState({
      // 'accessToken': token['access'],
      // 'refreshToken': token['refresh'],
      'loggedAs': username,
      'token': token
    }, () => this.loadData());
  }

  getTokenStorage () {
    const cookies = new Cookies();
    // const token = cookies.get('accessToken');
    const user = cookies.get('loggedAs');
    const token = cookies.get('token');
    const gameName = cookies.get('currentGameName');
    const gameId = cookies.get('currentGameId');    
    // if (token['access']) {
    // if (token) {                    
      this.setState({
        // 'accessToken': token['access'],              
        // 'refreshToken': token['refresh'],
        'loggedAs': user,
        'token': token,
        'currentGameName': gameName,
        'currentGameId': gameId
      }, () => this.loadData());                  
  }

  getToken (username,password) {
    const baseUrl = this.state.baseUrl;
    const data = {username: username, password: password};    
    // axios.post(baseUrl+'/token/', data).then(response => {
    axios.post(baseUrl+'-token-auth/', data).then(response => { 
      // this.setToken(response.data['token']);                   
      this.setToken(response.data['token'], username);   
      // this.setState({
      //   'loggedAs': username
      // });        
    }).catch(error => alert('Wrong username or password'));
  }

  getHeaders () {
    let headers = {      
      'Content-Type': 'application/json',      
    };
    if (this.isAuth()) {
      // headers['Authorization'] = 'Bearer ' + this.state.accessToken;
      headers['Authorization'] = 'Token '+this.state.token;
    };    
    return headers;
  }

  loadData () {
    // const baseUrl = this.state.baseUrl;
    // const headers = this.getHeaders();
   
    const footer = [banners.footer, 'Made by Eugene Lavrenko'];
    const greetings = banners.aboutMe;

    this.setState({      
      'footer': footer,
      'aboutMe': greetings,
    });   
  }
  
// ******************************Authentication*************************************
// *******************************ELEMENTS DECORATING*************************************
  selectedMenu (event) {
    
    const element = event.target;
    if (element.tagName === 'A') {
      // console.log(element.parentNode);
      const parentEl = element.parentNode;
      const grabdPa = parentEl.parentNode; 
      for (const child of grabdPa.children) {
        child.classList.remove('menu-selected');
      }
      parentEl.classList.add('menu-selected')
    }
    
  }
// *******************************ELEMENTS DECORATING*************************************
// ********************************GAME ACTIONS******************************************

createGame () {
  const headers = this.getHeaders()
  const cookies = new Cookies()
  const data = {
    player: this.state.loggedAs
  };

  // const testEl = document.querySelector('#text')
  console.log('create!')
  // testEl.textContent = ''
  // testEl.textContent += `Created game for ${this.state.loggedAs}`
  axios.post(`${this.state.baseUrl}/game/`, data, {headers})
        .then(response => {          
          this.setState({
            'currentGameId': response.data.id,
            'currentGameName': response.data.name
          })
          cookies.set('currentGameId', response.data.id)
          cookies.set('currentGameName', response.data.name)
        })
        .catch(error => console.log(error))

}


getCell () {
  // console.log('GET GET GET');
    const headers = this.getHeaders();
    const baseUrl = this.state.baseUrl;
    const testEl = document.querySelector('#text')

    axios.get(baseUrl+'/cells/', {headers}).then(response => {
      // this.setState({
      //   'notes': response.data,        
      // });
      for (const i of response.data.results) {
        testEl.textContent += i.id + ' '
        testEl.textContent += i.xCoordinate + ' '
        testEl.textContent += i.yCoordinate + ' '
        testEl.textContent += i.board + ' '
        testEl.textContent += i.haveShip + ' '
        testEl.textContent += i.hitted + '\n'
      }      

    }).catch(error => console.log(error));

  
}

hitCell (id) {
  
    const headers = this.getHeaders();   
    const data = {
      hitted: true
    }

    axios.put(`${this.state.baseUrl}/cells/${id}/`, data, {headers})
        .then(response => {         
          // this.state.users.results = this.state.users.results.filter((item) => item.id !== id); 
          // this.setState({});         
        })
        .catch(error => console.log(error))
  

}

clearCell () {
  
  const testEl = document.querySelector('#text')
  testEl.textContent = ''
}





// ********************************GAME ACTIONS******************************************
// *********************************RENDER*******************************************
  componentDidMount() {   
    this.getTokenStorage();
  }

  render() {
    return (        
      <div>        
        <BrowserRouter>
        <div className="menu container">
          <nav onClick={(event) => this.selectedMenu(event)} className='navigation'>
            <li className="menu-selected menu-item">
              <Link to="/">Main</Link>
            </li>            
            <li className="menu-item">
              <Link to="/game">Game</Link>
            </li> 
            <li className="menu-item">
              {this.isAuth() ? <button onClick={() => this.logout()}>
                              {`Logout as ${this.state.loggedAs}`}
                              </button> : <Link to="/login">Login</Link>}
            </li>        
          </nav>
        </div>
          <Routes>
            <Route exact path="/" element={<Navigate to="/main"/>}/>
            <Route exact path="/login" element={<LoginForm isAuth={() => this.isAuth()} 
                        getToken={(username, password) => this.getToken(username, password)}/>}/>
            {/* <Route exact path="/users/create" element={<UserForm 
              createUser={(userName, firstName, lastname, email) => 
              this.createUser(userName, firstName, lastname, email)}/>}/> */}
            {/* <Route exact path="/users">
              <Route index element={<UserList  users={this.state.users} 
                                              deleteUser={id => this.deleteUser(id)}/>}/>
              <Route path=":userId" element={<ProjectUser projects={this.state.projects}/>}/>
            </Route>   */}
            <Route exact path="/main">
              <Route index element={<GreetingsBlock greetings={this.state.aboutMe}/>}/>
              {/* <Route path=":userId" element={<ProjectUser projects={this.state.projects}/>}/> */}
            </Route>      
            
            <Route exact path="/game">
              <Route index element={<GamePreview isAuth={() => this.isAuth()}
                                              createGame={() => this.createGame()}
                                              gameName={this.state.currentGameName}/>}/>   

              <Route path="field" element={<GameField getCell={() => this.getCell()}
                                        clearCell={() => this.clearCell()} 
                                        gameName={this.state.currentGameName}                                      
                                        itCell={(id) => this.hitCell(id)}/>}/>
            </Route>
            {/* <Route exact path="/gamefeeld">
            <Route index element={<GameField/>}/>
            </Route> */}
            <Route path="*" element={<NotFound404/>}/>            
          </Routes>
        </BrowserRouter>                
       
        <FooterBlock footer={this.state.footer}/>
      </div>       
      )
  };  
};

export default App;

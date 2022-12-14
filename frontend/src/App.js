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
import { selectedMenu } from './components/DOMmechanics';
// import { createGame } from './components/gameActions';
// import { logout, setToken } from './components/authentication';

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
      'currentBoard': '',
      'myShips': '',
      'myCells': '',
      'shipsReady': {},
      'shipsOk': false,
      // 'baseUrl': 'http://localhost:8001/api',      
      'baseUrl': 'https://devlev22.de:8043/api',
    };
  }

  

// ********************Authentication*************************************

  logout () {
    this.setToken('');
    this.setState({     
      'loggedAs': '', 
      'currentGameId': '',
      'currentGameName': '',     
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
    const board = cookies.get('currentBoard');
    // const cells = cookies.get('myCells');
    // const ships = cookies.get('myShips');
    // if (token['access']) {
    // if (token) {                    
      this.setState({
        // 'accessToken': token['access'],              
        // 'refreshToken': token['refresh'],
        'loggedAs': user,
        'token': token,
        'currentGameName': gameName,
        'currentGameId': gameId,
        'currentBoard': board,
        // 'myShips': ships,
        // 'myCells': cells,
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
    const headers = this.getHeaders()

    const data = {
      game_name: this.state.currentGameName
    }

    // console.log('board: '+this.state.currentBoard)

    if (this.state.currentGameName){
      axios.get(`${this.state.baseUrl}/board/${this.state.currentBoard}`, {headers}).then(response => {
            // console.log(response.data)
            this.setState({
              'myShips': response.data.ships,
              'myCells': response.data.cells
            })
            // for (const cell of this.state.myCells) {
            //   console.log(cell)
            // }

      }).catch(error => console.log(error));
    }
    


    this.setState({      
      'footer': footer,
      'aboutMe': greetings,
    });   
  }
  
// ******************************Authentication*************************************
// *******************************ELEMENTS DECORATING*************************************
 
// *******************************ELEMENTS DECORATING*************************************
// ********************************GAME ACTIONS******************************************

createGame () {
  const headers = this.getHeaders()
  const cookies = new Cookies()
  const data = {
    player: this.state.loggedAs
  };

  
  console.log('create!')
  
  
  const myTeam = 'team1'
 
  const myBoard = []

  axios.post(`${this.state.baseUrl}/game/`, data, {headers})
        .then(response => {           
          const myShips = []
          const myCells = []
          
          for (const ship of response.data.ships1) {
             myShips.push(ship)
          }
          for (const cell of response.data.cells1) {
            myCells.push(cell)
         }                    
          this.setState({
            'myShips': myShips,
            'myCells': myCells,
            'currentBoard': response.data.board.id,
            'currentGameId': response.data.game.id,
            'currentGameName': response.data.game.name,
            'shipsReady' : {}
          }, () => {
            cookies.set('currentGameId', response.data.game.id)
            cookies.set('currentGameName', response.data.game.name)            
            cookies.set('currentBoard', response.data.board.id)
            
          })

          
        })
        .catch(error => console.log(error))

}


getCell () {
  // console.log('GET GET GET');
    const headers = this.getHeaders();
    const baseUrl = this.state.baseUrl;
    

    axios.get(baseUrl+'/cells/', {headers}).then(response => {
           

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


saveBoardShips () {
  
  const headers = this.getHeaders();
  const id = this.state.currentBoard;
  const data = {}
  let pool = {};

  console.log(this.state.shipsReady)
  for (const ship in this.state.shipsReady) {     
      data[ship] = []
      for (const cell of this.state.shipsReady[ship]) {      
        let arr = [cell.dataset.x, cell.dataset.y]
        data[ship].push(arr);
      }
    }
 
  
    console.log('SAVE BOARD SHIPS')
  axios.put(`${this.state.baseUrl}/board/${id}/`, data, {headers})
      .then(response => {         
        this.loadData()
        console.log('RESPONSE)))')        
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
          <nav onClick={(event) => selectedMenu(event)} className='navigation'>
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
            {!this.state.currentGameName ? <Route exact path="/game/field" 
                                                element={<Navigate to="/game"/>}/> : null}
            <Route exact path="/login" element={<LoginForm isAuth={() => this.isAuth()} 
                        getToken={(username, password) => this.getToken(username, password)}/>}/>
           
            <Route exact path="/main">
              <Route index element={<GreetingsBlock greetings={this.state.aboutMe}/>}/>
              {/* <Route path=":userId" element={<ProjectUser projects={this.state.projects}/>}/> */}
            </Route>      
            
            <Route exact path="/game">
              <Route index element={<GamePreview isAuth={() => this.isAuth()}
                                              createGame={() => this.createGame()}
                                              gameName={this.state.currentGameName}/>}/>   

              <Route path="field" element={<GameField  createGame={() => this.createGame()}                                       
                                        state={this.state}                                                                            
                                        hitCell={(id) => this.hitCell(id)}
                                        saveBoardShips={()=>this.saveBoardShips()}/>}/>
            </Route>           
            <Route path="*" element={<NotFound404/>}/>            
          </Routes>
        </BrowserRouter>                
       
        <FooterBlock footer={this.state.footer}/>
      </div>       
      )
  };  
};

export default App;

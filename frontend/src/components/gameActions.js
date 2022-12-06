import axios from "axios";
import Cookies from "universal-cookie";




export function createGame () {
    const headers = this.getHeaders()
    const cookies = new Cookies()
    const data = {
      player: this.state.loggedAs
    };
  
    // const textEl = document.querySelector('#text')
    // const textEl1 = document.querySelector('#text1')
    // const textEl2 = document.querySelector('#text2')
    console.log('create!')
    // textEl.textContent = ''
    // textEl1.textContent = ''
    // textEl2.textContent = ''
    
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
              'currentGameName': response.data.game.name
            }, () => {
              cookies.set('currentGameId', response.data.game.id)
              cookies.set('currentGameName', response.data.game.name)            
              cookies.set('currentBoard', response.data.board.id)
              
            })
  
            // console.log(myCells)
  
  
            // cookies.set('currentGameId', response.data.game.id)
            // cookies.set('currentGameName', response.data.game.name)
            // cookies.set('testcoc', myCells)
            // cookies.set('myCells', this.state.myCells)
            // cookies.set('myShips', myShips)
  
            // textEl.textContent = response.data.game.id + '\n'
            // textEl.textContent = response.data.game.name + '\n'
  
  
          })
          .catch(error => console.log(error))
  
  }
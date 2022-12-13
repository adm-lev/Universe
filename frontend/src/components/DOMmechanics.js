


export function helpText  ()  {

    const textEl = document.querySelector('#help');

    textEl.innerHTML = 'Choose each ship below and select proper number of cells on the field'

  }

export function selectedMenu (event) {
    
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


  export function shipShuffle (state) {
    const cellEls = document.querySelectorAll('.fr-tl')   
    for (const cell_ of cellEls) {
      cell_.classList.add('green')
      cell_.classList.remove('red')
      cell_.classList.remove('yellow')
    }   
    for (const ship of state.myShips) {     
      placeShip(cellEls, ship.maxHealth)
    }
  }


  function placeShip (cellEls, stages) { 
    
    while (true) {
    const horizontal = !Math.floor(Math.random() * 2);   
    const startPosX = Math.floor(Math.random() * 10) + 1;
    const startPosY = Math.floor(Math.random() * 10) + 1;
    const selectArray = validate(horizontal, startPosX, startPosY, cellEls, stages);
    if (selectArray) {
   
      // pain cells before ship
      let X = selectArray[0].dataset.x;
      let Y = selectArray[0].dataset.y;
      for (const el of cellEls) {
        if (horizontal){
        if (
          (+el.dataset.x === +X-1 && +el.dataset.y === +Y-1) ||
          (+el.dataset.x === +X && +el.dataset.y === +Y-1) ||
          (+el.dataset.x === +X+1 && +el.dataset.y === +Y-1)
        ) {
          el.classList.add('yellow')
        }
      } else {
        if (
          (+el.dataset.x === +X-1 && +el.dataset.y === +Y-1) ||
          (+el.dataset.x === +X-1 && +el.dataset.y === +Y) ||
          (+el.dataset.x === +X-1 && +el.dataset.y === +Y+1)
        ) {
          el.classList.add('yellow')
        }
      }
      }
      // paint side cells
      for (const el of selectArray) {
        let x = el.dataset.x;
        let y = el.dataset.y; 
        for (const cell of cellEls) {
          if (horizontal) {
            if ((+cell.dataset.x === +x-1 && +cell.dataset.y === +y) ||
                (+cell.dataset.x === +x+1 && +cell.dataset.y === +y)) {
                  cell.classList.add('yellow')
            }
          } else {
            if ((+cell.dataset.x === +x && +cell.dataset.y === +y-1) ||
                (+cell.dataset.x === +x && +cell.dataset.y === +y+1)) {
                  cell.classList.add('yellow')
            }
          }
        }
      }
      //  paint cell after ship
      X = selectArray[selectArray.length-1].dataset.x;
      Y = selectArray[selectArray.length-1].dataset.y;
      for (const el of cellEls) {
        if (horizontal){
        if (
          (+el.dataset.x === +X+1 && +el.dataset.y === +Y+1) ||
          (+el.dataset.x === +X && +el.dataset.y === +Y+1) ||
          (+el.dataset.x === +X-1 && +el.dataset.y === +Y+1)
        ) {
          el.classList.add('yellow')
        }
      } else {
        if (
          (+el.dataset.x === +X+1 && +el.dataset.y === +Y+1) ||
          (+el.dataset.x === +X+1 && +el.dataset.y === +Y) ||
          (+el.dataset.x === +X+1 && +el.dataset.y === +Y-1)
        ) {
          el.classList.add('yellow')
        }
      }
      }
      for (const el of selectArray) {
        el.classList.add('red')
        el.classList.add('yellow')        
      }
      break;
    } else {
      continue;
    }
  }     
  }

  function validate (horizontal, startPosX, startPosY, cellEls, stages) {
    const results = [];
    let X = startPosX;
    let Y = startPosY;
    //  validate a position of the first cell
    // let currentCell = null;  
      for (const el of cellEls) {
        if (+el.dataset.x === +X && +el.dataset.y === +Y ) {          
          const positionOk = horizontal ? (Y + stages-1 <= 10) : (X + stages-1 <= 10);          
          if (positionOk && !el.classList.contains('yellow')) {  
            // currentCell = el;      
            results.push(el);
          } else {
            return null;
          }
          break;
        }
      }
      //  validate the rest of cells
      for (let i=1; i<stages; i++) { 
         if (horizontal){
          Y += 1; 
         } else {
          X += 1;
         }                      
                
        for (const el of cellEls) {
          if (+el.dataset.x === +X && +el.dataset.y === +Y ) {
            if (!el.classList.contains('yellow')) { 
              // el.classList.add('yellow');
              // console.log(el)
              results.push(el);
              break;
            } else {
              return null;
            }
          } 

        }
      }


    return results; 
  }







  const abortController = new AbortController()

  const paintCells = (event, shipHealth, state, ship) => {
    const cell = event.target;
    const statusEl = document.querySelector('#ship-status')
    console.log(ship)
    if (cell.classList.contains('green')) {
      event.target.classList.remove('green');
      event.target.classList.add('yellow');
      shipHealth -= 1;

      statusEl.textContent = shipHealth
      
    }
    // abortController.abort() 
  }


export function shipChoose (e, state) {

    // const [myCells, setCells] = useState(0);
    // const [myShips, setShips] = useState(0);
    
    //  lists of the current ships and cells
    const ships = state.myShips
    // const cells = state.myCells    
    //  chosen ship ID
    const ship = e.target.value
    const textEl = document.querySelector('#text');
    const statusEl = document.querySelector('#ship-status')
    const cellEls = document.querySelectorAll('.fr-tl')
    // cellEls[0].parentNode.removeEventListener('click',paintCells)
    // console.log(cellEls)
    // a variable for the cells count
    let shipHealth = 0
   
    textEl.textContent = ship + '\n'
    // show is ship ready?
    // console.log(shipsReady[ship])
    //   mark cells free to ship allocation
    for (const cell_ of cellEls) {
      cell_.classList.add('green')
    }

    for (const ship_ of ships) {      
      if (ship_.id ===  parseInt(ship)) {
        statusEl.textContent = `${ship_.shipType}: `;
         // cells = health  
        shipHealth = ship_.health
        statusEl.textContent += shipHealth+' cells left';                  
      }
    }
    console.log('ok')
   cellEls[0].parentNode.addEventListener('click',(ev) => paintCells(ev, shipHealth, state, ship),{signal: abortController.signal})

}
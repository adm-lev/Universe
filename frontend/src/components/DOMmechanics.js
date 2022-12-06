


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


  export function shipShuffle () {
    const cellEls = document.querySelectorAll('.fr-tl')
    // Math.floor(Math.random() * max);
    for (const cell_ of cellEls) {
      cell_.classList.add('green')
    }
      // console.log(i++)
    const stages = 4;





    const horizontal = !Math.floor(Math.random() * 2);
    const startPosX = Math.floor(Math.random() * 10) + 1;
    const startPosY = Math.floor(Math.random() * 10) + 1;
    const selectArray = [];
    // for (const i = 0; i<stages; i++) {
    const isValid = horizontal ? (startPosY + 3 <= 10) : (startPosX + 3 <= 10);  

      for (const el of cellEls){
        if (+el.dataset.x === startPosX && +el.dataset.y === startPosY){

            

            selectArray.push(el);  
            el.classList.add('yellow')           
            break;            
        }       
      } 
    // }
    console.log(selectArray)
    console.log('horizo '+ horizontal)
    console.log('isValid '+ isValid)
    // console.log(startPos)
    findOthers(selectArray[0], horizontal, cellEls)
      

  }


  function findOthers (el, stage, horisontal, cellEls) {    

    const nextEl = el;

    nextEl = horisontal ? 
      cellEls.querySelector(`[data-x="${nextEl.dataset.x}"][data-y="${nextEl.dataset.y+1}"]`) :
      cellEls.querySelector(`[data-x="${nextEl.dataset.x+1}"][data-y="${nextEl.dataset.y}"]`);
      
      if (!nextEl.classList.contents('yellow')){
        nextEl.classList.add('yellow')
      } 
      

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
    const cells = state.myCells    
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
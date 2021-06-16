import { onSnake, expandSnake } from './snake.js' //22°
import { randomGridPosition } from './grid.js' //22°

//17°: creamos food.js que va a representar los segmentos q va a ir comiendo el snake. Vamos a hacer algo muy similar a lo q hicimos en snake: vamos utilizar la function update() y draw.
let food = getRandomFoodPosition() //26°
/* let food = { x: 10, y: 1 } *///18°
const expansionRate = 1;//19°: esta constante servirá para determinar cuanto crecerá la snake cuando coma la comida
export function update() {
    //20°
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPosition()//26°
    }
}



export function draw(gameBoard) {
    const foodElement = document.createElement('div') 
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}


//25°: ahora nos centramos en el problema de colocar la comida en posiciones random. Para eso creamos esta función. Esto nos va a retornar una nueva posición para la comida, cada vez q la anterior sea comida.
function getRandomFoodPosition(){
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()//cda vez q esta funcion se ejecute nos dará una nueva food position y si esa food position ya está dentro de la snake, entonces nos dara otra y se va a loopear así hasta q encuentre 1 valor q no esté en la snake.
    }
    return newFoodPosition
}
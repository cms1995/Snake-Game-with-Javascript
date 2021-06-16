import { getInputDirection } from "./input.js";//15°

//4° a continuacion, para actualizar la posicion de la snake, en vez de renderizarla cada 1000 milisegundos. Vamos a hacer nada en nuestra mainFunction, A MENOS QUE lleguemos a cierta velocidad.. Eso lo haremos una const llamada snakeSpeed, que medirá cuantas veces se mueve la serpiente x segundo. con esto podemos controlar cuan rapido nuestro juego se va a estar actualizando según la velocidad q le asinemos. Si cambiamos el valor x 1 se va a renderizar una vez x segundo. En este caso lo hará 2 veces x segundo.. La pasamos a snake.js para mayor comodidad
export const snakeSpeed = 5;
//9°: empezamos a representar la serpiente creando una constante de array en las posiciones x, y (con las ventajas q nos da grid) (recordemos q la serpiente es un pedazo de segmentos )
const snakeBody = [
    { x: 11, y: 11}
]
let newSegments = 0; //20° ... luego para q nuestra snake crezca, en nuestra funcion update, tenemos q tomar esos new segments y añadirlos a nuestra snake, para ello crearemos antes una función al final del doc y la llamaremos en update 23°


/* 6 y 7 */
export function update(){
    addSegments()//23°
    const inputDirection = getInputDirection()//15°
    //12°
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y; /* notese q cuando y se incrementa en un positivo, la snake se mueve para abajo y viceversa si es un negativo */
}

export function draw(gameBoard){
    /* 10: ahora vamos a loopear cada pieza de los segmentos de nuestro snakeBody para que se vaya dibujando en la pantalla(gameboard) */
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div') /* 11°: este va  a ser un solo div que va a aparecer adentro del gameboard en una particular coordenada x,y. Como estamos usando grid, podemos setear esa coordenada de la sgte manera: */
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

//20°
export function expandSnake(amount){
    newSegments += amount;
}

//21°: esta funcion va a tomar una posición y va a determinar si esa posicion está en nuestra snake. Para ello vamos a lopear cada uno de nuestros segmentos y vamos a chequear si cada uno de ello se encuentra en nuestra snake. Vamos a comparar nuestra position con segment position para ver q sean igales
export function onSnake(position, { ignoreHead = false } = {}){
    return snakeBody.some((segment, index) =>{
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

//34°
export function getSnakeHead(){
    return snakeBody[0];
}

//35°: la manera para determinar si la snake se intersectó a si misma o no, es determinar si la cabeza de la snake está tocando cualquiera de las otras partes del cuerpo de la misma
export function snakeIntersection(){
    return onSnake (snakeBody[0], { ignoreHead: true})
}

//21°: si nuestras 2 posiciones son exactamente las = entonces return equalPositions(segment, position) va a retornar true, y si ese es el caso para cualquiera de las snake positions pusimos el .some: entonces si cualquier parte del cuerpo es igual a esa posicion q se le pasó, entonces la snake va a retornar true. Luego lo importamos al food.js
function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}


//23°
function addSegments(){
    for (let i = 0; i < newSegments; i++){
        //23°: quitamos el ultimo elemento de nuestra snake y lo duplicamos en el final de la misma
        snakeBody.push({...snakeBody[snakeBody.length - 1] })
    }
    //24°: para q no crezca ilimitadamente tomamos newSegments y lo seteamos a 0. Ahora no se van a agregar elementos de más a la snake, solo los  q nosotros especifiquemos en expansionRate
    newSegments = 0;
}
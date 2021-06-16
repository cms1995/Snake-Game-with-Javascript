import { update as updateSnake, draw as drawSnake,snakeSpeed, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'//19°
import { outsideGrid } from './grid.js'

//2°: para ver cuando tiempo paso desde la ultima vez q renderizo la mainFunction creamos esta constante 
let lastRenderTime = 0;
let gameOver = false; //30°
const gameBoard = document.getElementById('game-board')/* 12°: luego de q llamamos el gameboard en la funcion draw pasamos el gameBoard q creamos en snake.js y lo llamamos x el id del index.html. Allí aparecerá en pantalla la snake con su estilo en azul q le dimos en style.css */

//1° nuestra main function va a correr una y otra vez para siempre. SE va a rendirizar constantemente
function mainFunction(currentTime){
    if (gameOver){  //31°: resetear el juego 1 vez q perdamos
        if (confirm('You lost. Press ok to restart')){
            window.location = '/'
        }
        return        
    }


    window.requestAnimationFrame(mainFunction);
    //3°. la cantidad de segundos q pasaron desde la ultima renderización la hacemos con esta cte. como está en milisegundos, lo / en 1000 para pasarlo a segundos
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return //5°

    lastRenderTime = currentTime;

  
    update()/* 6°: este update loop va a actualizar toda la lógica de nuestro juego */
    draw() /* 7: se va a basar en el update loop. Va a tomar toda la logica q haya en el momento de leer el update loop */
}

window.requestAnimationFrame(mainFunction)

/* 6° y 7°. tambien exportaremos estas funciones(update, draw) para utilizarlas en el snake.js */
function update(){
    updateSnake();/* 8° llamo las funciones en las main updatey main draw functions respectivamente*/
    updateFood();
    //29°:para q crear un modo de perder cuando choquemos las paredes o la snake se choque a si misma/, vamos a crear la sgte funcion: checkDeath
    checkDeath()
    
}

function draw(){
    gameBoard.innerHTML = '';/*13°: antes de este punto, cuando se dibujaba la snake no se removían los pedazos anteriores de la misma y por ello se hacía interminable. Con esta línea, seteando el inner html a nada y esto va a limpiar todas las partes en el tablero, quedando solo la snake de 3 partes. Ahora se moverá sin dejar ningun pedazo previo*/
    drawSnake(gameBoard);
    drawFood(gameBoard)
}

//29°
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
//32°: eportamos la funcion outsideGrid a grid.js y getSnakeHead y snakeIntersection a snake.js 
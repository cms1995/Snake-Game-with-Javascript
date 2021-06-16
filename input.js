/* 14: creamos el input.js  */
let inputDirection = {x: 0, y: 0} /* 14: por default, no queremosque la snake se este moviendo a ningún lado */
let lastInputDirection = { x: 0, y: 0 }//16°

//16°: el e.ley va a ser igual a arrow up, down, left o rigth. Con esto ya podremos empezar a mover el snake
window.addEventListener('keydown', e =>{
    switch (e.key){
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break;//16°
            inputDirection = { x: 0, y: -1 };
            break;

        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break;//16°
            inputDirection = { x: 0, y: 1 };
            break;

        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break;//16°
            inputDirection = { x: -1, y: 0 };
            break;

        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break;//16°
            inputDirection = { x: 1, y: 0 };
            break;        

    }
})

//15: esta función q va a retornar el inputDirection, la exportamos al snake.js, en la función update()
export function getInputDirection(){
    lastInputDirection = inputDirection //16°: vamos a corregir un bug en el q se a mover en reversa de abajo hacia arriba y de izquierda a derecha y viceversa. Recorsa q en el juego clásico, esos movimientos no se pueden y para ello creamos esta variable.
    return inputDirection
}

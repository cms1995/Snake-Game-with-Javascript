//27° en este archivo creamos la randomGridPosition function

const gridSize = 21; //28°

export function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

//33°: tenemos q chequear si la posicion que pasamos a la función es mayor que el grid size(o sea 21) o si es menor a 1 (que es el minimo del grid size)
export function outsideGrid(position){
    return(
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize    
    )    
}
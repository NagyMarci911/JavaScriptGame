document.addEventListener('DOMContentLoaded', ()=>{
    

const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
const colours = [
    'red',
    'green',
    'blue',
    'purple',
    'yellow'
]
let currentColor;
let ReplacedColor;
let selectedSquareID;
let squareIdReplaced;
let score = 0;

PrepareBoard();
squares.forEach(square => square.addEventListener("dragstart",dragstart))
squares.forEach(square => square.addEventListener("dragend",dragend))
squares.forEach(square => square.addEventListener("dragover",dragover))
squares.forEach(square => square.addEventListener("dragenter",dragenter))
squares.forEach(square => square.addEventListener("dragleave",dragleave))
squares.forEach(square => square.addEventListener("drop",dDrop))


function dragstart(){
    currentColor = this.style.backgroundColor;
    selectedSquareID = parseInt(this.id);
}
function dragend(){
    const validMoves = [selectedSquareID-1,selectedSquareID+1,selectedSquareID-width,selectedSquareID+width];
    const isValid = validMoves.includes(squareIdReplaced);
    if(squareIdReplaced && isValid){
        squareIdReplaced = null;
    }else if(squareIdReplaced && !isValid){
        squares[squareIdReplaced].style.backgroundColor = ReplacedColor;
        squares[selectedSquareID].style.backgroundColor = currentColor;
    }else{
        squares[selectedSquareID].style.backgroundColor = currentColor;
    }
}
function dragover(e){
    e.preventDefault();
    console.log("dragover");
}
function dragenter(e){
    e.preventDefault();
    console.log("dragenter")
}
function dragleave(){
    console.log("dragleave")
}
function dDrop(){
    ReplacedColor = this.style.backgroundColor;
    squareIdReplaced = parseInt(this.id);
    squares[selectedSquareID].style.backgroundColor = this.style.backgroundColor;
    squares[squareIdReplaced].style.backgroundColor = currentColor;
}


function PrepareBoard(){
    for(let i = 0; i < width*width; i++){
        const div = document.createElement('div');
        const numb =Math.floor(Math.random()*colours.length)
        div.style.backgroundColor = colours[numb];
        div.setAttribute("draggable", true);
        div.setAttribute("id", i);
        grid.appendChild(div);
        squares.push(div);
    }
}

function CheckForThreeRow(){
    for(let i = 0; i < width*width-2;i++){
        let rowThree = [i,i+1,i+2];
        let currCol = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';
        //checking if all 3 squares has the same color, if all, than db = 3
        let db = 0;
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if(notValid.includes(i)){
            continue;
        }
        for(let j = 0; j<rowThree.length;j++){
            if(currCol == squares[i+j].style.backgroundColor){
                db++;
            }
        }
        if(db===3 && !isBlank){
            score++;
            rowThree.forEach(index => {squares[index].style.backgroundColor = ''})
        }
    }
}

function CheckForThreeColumn(){
    for(let i = 0; i < width*(width-2);i++){
        let columnThree = [i,i+width,i+width*2];
        let currCol = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';
        //checking if all 3 squares has the same color, if all, than db = 3
        let db = 0;
        for(let j = 0; j<columnThree.length;j++){
            if(currCol == squares[i+j*width].style.backgroundColor){
                db++;
            }
        }
        if(db===3 && !isBlank){
            score++;
            columnThree.forEach(index => {squares[index].style.backgroundColor = ''})
        }
    }
}

window.setInterval(()=>{CheckForThreeRow(); CheckForThreeColumn()},100);

})


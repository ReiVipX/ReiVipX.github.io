// Initial Data
const pointView = document.getElementById('points');
const lifesView = document.getElementById('lifes');
const screen = document.getElementById('screen');
const ctx = screen.getContext('2d');
let life = 3;
let points = 0;
let start = false;
let timer = 5000;
let timeSet;

// Events
screen.addEventListener('mousedown', click);
document.querySelector('.reset').addEventListener('click', resetGame);
document.querySelector('.play').addEventListener('click', startGame);
document.querySelector('.classicMode').addEventListener('click', classicMode);
document.querySelector('.timerMode').addEventListener('click', timerMode);


// Functions
function resetGame(){ // RESET the game
    life = 3;
    timer = 5000;
    points = 0;
    pointView.innerText = points;
    lifesView.innerText = life;
    stopTimer();
    clearScreen();
    start = false;
}

// Objetcs
class Target {
    // Contructor
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    //Methods
    spawnTarget(){
        let targetPositionX;
        let targetPositionY;

        minX = Math.ceil(0);
        maxX = Math.floor(screen.width - 50);
        minY = Math.ceil(0);
        maxY = Math.floor(screen.height - 50);

        targetPositionX = Math.floor(Math.random() * (maxX - minX)) + minX;
        targetPositionY = Math.floor(Math.random() * (maxY - minY)) + minY;

        ctx.fillStyle = this.color;
        ctx.fillRect(enemyPositionX, enemyPositionY, 50, 50);
    }
}
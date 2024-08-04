// Initial Data
let pointView = document.getElementById('points');
let lifesView = document.getElementById('lifes');
let screen = document.getElementById('screen');
let ctx = screen.getContext('2d');
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
function click(e){ // Click the ENEMY
    x = e.pageX - screen.offsetLeft;
    y = e.pageY - screen.offsetTop;

    color(x,y);

    if((red !== 0 || green !== 0 || blue !== 0) && start == true){
        points++;
        pointView.innerText = points;
        lifesView.innerText = life;
        if(timer >= 400){
            timer -= 50;
        }
        stopTimer();
        despawn();
    }
    //console.log(x,y);
}
function color(x,y){ // Find the COLOR where the mouse is
    let debugX = (6);
    let debugY = (6);
    
	let imgData = ctx.getImageData((x-debugX), (y-debugY), 1, 1);
	red = imgData.data[0];
	green = imgData.data[1];
	blue = imgData.data[2];
	alpha = imgData.data[3];
    
    return (red, green, blue, alpha);
}
function spawn() { // Make a new ENEMY position and SPAWN a ENEMY
    let enemyPositionX;
    let enemyPositionY;

    minX = Math.ceil(0);
    maxX = Math.floor(screen.width - 50);
    minY = Math.ceil(0);
    maxY = Math.floor(screen.height - 50);

    enemyPositionX = Math.floor(Math.random() * (maxX - minX)) + minX;
    enemyPositionY = Math.floor(Math.random() * (maxY - minY)) + minY;

    //console.log(enemyPositionX,enemyPositionY);
    enemy(enemyPositionX, enemyPositionY);
}
function enemy(enemyPositionX, enemyPositionY){ // Make a ENEMY
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyPositionX, enemyPositionY, 50, 50);
}
function despawn(){  // DESPAWN and SPAWN a new ENEMY
        clearScreen();
        if(life == 0){
            gameOver();
        }else {
            spawn();
            startTimer();
        }
}
function startGame(){ // START the game
    if( start === false){
        resetGame();
        spawn();
        startTimer();
    }else if(start === true){
        console.log("ERRO");
    }
    start = true;
}
function gameOver() { // GAME OVER screen
    clearScreen();
    start = false;
    ctx.font = "100px Arial";
    ctx.fillStyle = 'purple';
    ctx.fillText("GAME OVER",130,258);
}
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
function startTimer() { // start a TIMER
    timeSet = setTimeout(() => {
        life--; 
        lifesView.innerText = life;
        if(life == 0){
            gameOver()
        }else{
            despawn()
        }}, timer);
}
function stopTimer() { // stop the TIMER
    clearTimeout(timeSet);
}
function clearScreen(){ // clar the screen
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var dinoJumping = false;
var jumpTimer = 0;
var timer = 0;
var cactusArray = [];
var animation;

canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;

const enemySpwanX = canvas.width*0.9;
const dinoSpawnX = canvas.width*0.1;

const grandY = canvas.height*0.5;

var img = new Image();

var dino = {
	x : canvas.width*0.1,
	y : canvas.height*0.5,
	width : 50,
	height : 50,
	jumpTimer : 40,
	jumpHeight : (this.x+this.y)*1.5,
	draw(){
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		//ctx.drawImage(img, this.x, this.y, this.width, this.height);
	}
}

class Cactus {
	constructor(){
		this.x = enemySpwanX;
		this.y = grandY;
		this.width = 50;
		this.height = 50;
	}
	draw(){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

start();

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space' && dinoJumping == false) {
		dinoJumping = true;
	}
});

/////////////////////////////////////////////////////////////////////////////////

function start() {
	loop();	
}

function dead() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cancelAnimationFrame(animation);
	ctx.fillStyle = 'black';
	ctx.font = '50px Arial';
	ctx.fillText('Game Over', canvas.width*0.4, canvas.height*0.2);
	animation = null;
	cactusArray = [];
	dino.y = grandY;

	setTimeout(() => {
		start();
	}, 1000);
}

function loop(){
	animation = requestAnimationFrame(loop);
	timer++;

	let score = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(timer % 200 === 0){
		var cactus = new Cactus();
		cactusArray.push(cactus);		
	}

	cactusArray.forEach((a, i, o)=>{
		// x 좌표가 0 미만이면 제거
		if(a.x < 0){
			cactusArray.splice(i, 1);
			score += 10;
			ctx.fillText(score, canvas.width * 0.4, canvas.height * 0.2);
		}
		a.x -= 3;		
		
		collisionCheck(dino, a);
		
		a.draw();
	});

	if(dinoJumping){
		dino.y -= 3;
		jumpTimer++;
	}
	if(dinoJumping == false){
		if(dino.y < grandY){
			dino.y +=3;
		}
	}
	if(jumpTimer > dino.jumpTimer){
		dinoJumping = false;		
		jumpTimer = 0;
	}	
	dino.draw();	
}

// 충돌확인
function collisionCheck(dino, enemy){
	var calculateX = enemy.x - (dino.x + dino.width);
	var calculateY = enemy.y - (dino.y + dino.height);

	if(calculateX < 0 && calculateY < 0){
		dead();
	}

	return false;
}

const score=document.querySelector(".scoreboard")
const gameArea=document.querySelector(".gameArea")
const startInfo=document.querySelector(".startInfo")

//player object
let player={
	speed:5,
	score:0
};

//keys object
let keys={
	arrowLeft:false,
	arrowUp:false,
	arrowRight:false,
	arrowDown:false,
};


document.addEventListener('keydown',function(e){
	e.preventDefault();
	if (e.which==37){
		keys.arrowLeft=true
	}
	else if (e.which==38){
		keys.arrowUp=true
	}
	else if (e.which==39){
		keys.arrowRight=true
	}
	else if (e.which==40){
		keys.arrowDown=true
	}
});

document.addEventListener('keyup',function(e){
	e.preventDefault();
	if (e.which==37){
		keys.arrowLeft=false
	}
	else if (e.which==38){
		keys.arrowUp=false
	}
	else if (e.which==39){
		keys.arrowRight=false
	}
	else if (e.which==40){
		keys.arrowDown=false
	}
});

//what will happen after clicking startInfo div
startInfo.addEventListener('click',function(){

	score.classList.remove('hide')
	startInfo.classList.add('hide')
	gameArea.innerHTML=" ";

	player.start=true;
	player.score=true;

	window.requestAnimationFrame(gamePlay);
    
    //generating road lines
    for(let x=0;x<5;x++){
    	let roadLine=document.createElement('roadline');
    	roadLine.setAttribute('class','lines');
    	roadLine.y =x*150;
    	roadLine.style.top=x*150 + "px";
    	gameArea.appendChild(roadLine);
    }
    

    //generating car
	let car=document.createElement('car')
	car.setAttribute('class','car')
	gameArea.appendChild(car);


	player.x=car.offsetLeft;
	player.y=car.offsetTop;

    //generating obstacles
	for(let x=0;x<3;x++){
    	let obstacle=document.createElement('obstacle');
    	obstacle.setAttribute('class','obstacle');
    	obstacle.y =((x+1)*350)*-1;
    	obstacle.style.top=x*150 + "px";
    	obstacle.style.backgroundImage="url('images/0.png')";
    	obstacle.style.left=Math.floor(Math.random()*350) + "px";
    	gameArea.appendChild(obstacle);
    }

})

//gamePlay function 
function gamePlay(){
	
	let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    
	if (player.start){
 		
 		moveLines();
 		moveObstacle(car);

		if (keys.arrowLeft && player.x>0){player.x-=player.speed}
		if (keys.arrowUp && player.y>(road.top + 70)){player.y-=player.speed}
		if (keys.arrowRight && player.x < (road.width - 55) ){player.x+=player.speed}
		if (keys.arrowDown && player.y < (road.bottom - 90) ){player.y+=player.speed}

		car.style.top=player.y + "px";
		car.style.left=player.x + "px";	

		window.requestAnimationFrame(gamePlay);

		player.score++;
		let ps=player.score-1;
		score.innerText= "Score: " + ps;

		if (player.score>=300 && player.score%100==0){
			player.speed++;
		}
		
	}
	
}


//moving road lines
function moveLines(){
	let lines=document.querySelectorAll('.lines');

    //code for moving lines
    //awesome logic :)
	for(let x=0;x<5;x++){
		if(lines[x].y >= 700){
			lines[x].y-=750;
		}
		lines[x].y += player.speed;
		lines[x].style.top= lines[x].y + "px";
	}
}

//moving obstcales
function moveObstacle(car){
	let obstacles=document.querySelectorAll('.obstacle');

   
	for(let x=0;x<3;x++){
      
        if (isCollide(car,obstacles[x])) {
        	endGame();
        } 

		if(obstacles[x].y >= 750){
			obstacles[x].y = -300;
			obstacles[x].style.left=Math.floor(Math.random()*350) + "px";
		}
		obstacles[x].y += player.speed;
		obstacles[x].style.top= obstacles[x].y + "px";
	}
}

//function to be executed when car hits obstacle
function endGame(){
	player.start=false;
	player.speed=5;
	startInfo.classList.remove('hide');
	startInfo.innerHTML="Game Over !!! <br> Your final score is " + player.score + " <br> Press here to restart";

}

//collison checker
function isCollide(a,b){
	aRect=a.getBoundingClientRect();
	bRect=b.getBoundingClientRect();

	return !((aRect.top>bRect.bottom)||(aRect.bottom<bRect.top)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
}



var canvas = document.getElementById("canvas");  //инициализация канваса
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
		canvas.width = w;
		canvas.height = h;
var sizeBlockRoad = 100;
var wRoad = 80;
var context = canvas.getContext("2d");
var prevRand = 0;
var prevRandScheme = 5;
var x = 0,y = 0,xn = w/2-wRoad/2 ,yn = h;  //глобальные переменные координат

var colorScheme = {
			background : "",
			road : ""
		};
var array = new Array();
var angle = 0;
var imgCar = new Image();
		imgCar.src = "car.png";
var flag_left = false;
var flag_right = false;
var timer;
var btn;


function direct(rx, ry, route) {    //функция прорисовки прямого участка дороги
	context.fillStyle = colorScheme.road;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":	
			context.fillRect(rx, ry, wRoad, -sizeBlockRoad);
			y -= sizeBlockRoad;
			y++;
			break;
		case "left":
			context.fillRect(rx, ry, -sizeBlockRoad, -wRoad);
			x -= sizeBlockRoad;
			x++;
			break;
		case "right":
			context.fillRect(rx, ry, sizeBlockRoad, wRoad);
			x += sizeBlockRoad;
			x--;
			break;
		
	}
}

function left(rx, ry, route) {    //функция прорисовки левого поворота
	context.fillStyle = colorScheme.road;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx-10, ry, 10, 0, -Math.PI/2, true);
			context.lineTo(rx-10, ry - wRoad);
			context.arc(rx-10, ry, wRoad + 10, -Math.PI/2, 0 );
			context.closePath();
			context.fill();
			x -= 10;
			x++;
			y -= 10;
			break;
		case "right":
			context.beginPath();
			context.arc(rx, ry-10, 10, Math.PI/2, 0, true);
			context.lineTo(rx+10, ry-10);
			context.arc(rx, ry-10, wRoad + 10, 0, Math.PI/2);
			context.closePath();
			context.fill();
			x += 10;
			y -= 10;
			y++;
			break;
	}
}

function left_low(rx, ry, route) {    //функция прорисовки левого поворота
	context.fillStyle = colorScheme.road;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx-80, ry, 80, 0, -Math.PI/2, true);
			context.lineTo(rx-80, ry - wRoad);
			context.arc(rx-80, ry, wRoad + 80, -Math.PI/2, 0 );
			context.closePath();
			context.fill();
			x -= 80;
			x++;
			y -= 80;
			break;
		case "right":
			context.beginPath();
			context.arc(rx, ry-80, 80, Math.PI/2, 0, true);
			context.lineTo(rx+80, ry-80);
			context.arc(rx, ry-80, wRoad + 80, 0, Math.PI/2);
			context.closePath();
			context.fill();
			x += 80;
			y -= 80;
			y++;
			break;
	}
}

function right(rx, ry, route) {   //функция прорисовки правого поворота
	context.fillStyle = colorScheme.road;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx + wRoad + 10, ry, wRoad +10, Math.PI, -Math.PI/2, false);
			context.lineTo(rx + wRoad + 10, ry - 10);
			context.arc(rx + wRoad + 10, ry, 10, -Math.PI/2, Math.PI, true);
			context.closePath();
			context.fill();
			x += wRoad+10;
			x--;
			y -= wRoad+10;
			break;
		case "left":
			context.beginPath();
			context.arc(rx, ry-wRoad-10, wRoad +10, Math.PI/2, Math.PI, false);
			context.lineTo(rx-10 , ry-wRoad-10);
			context.arc(rx, ry-wRoad-10, 10, Math.PI, Math.PI/2, true);
			context.closePath();
			context.fill();
			x -= wRoad+10;
			y -= wRoad+10;
			y++;
			break;
	}
}

function right_low(rx, ry, route) {   //функция прорисовки правого поворота
	context.fillStyle = colorScheme.road;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx + wRoad + 80, ry, wRoad +80, Math.PI, -Math.PI/2, false);
			context.lineTo(rx + wRoad + 80, ry - 80);
			context.arc(rx + wRoad + 80, ry, 80, -Math.PI/2, Math.PI, true);
			context.closePath();
			context.fill();
			x += wRoad+80;
			x--;
			y -= wRoad+80;
			break;
		case "left":
			context.beginPath();
			context.arc(rx, ry-wRoad-80, wRoad +80, Math.PI/2, Math.PI, false);
			context.lineTo(rx-80 , ry-wRoad-80);
			context.arc(rx, ry-wRoad-80, 80, Math.PI, Math.PI/2, true);
			context.closePath();
			context.fill();
			x -= wRoad+80;
			y -= wRoad+80;
			y++;
			break;
	}
}

function generateRoad(argument) {
	for (var i = 0; i < 5; i++) {
		array[i] = 0;
	}
	for (var i = 5; i < 100; i++) {  //формирование массив последовательности элементов дороги
		var rand = 0;
		var flag = true;

		while (flag) {             //алгоритм корректной последовательности элементов дороги
			rand = Math.round(Math.random() * (11 - 0) + 0);
			if ((prevRand==0&&rand==0)||
				  (prevRand==1&&rand==1)||
				  (prevRand==2&&rand==2)) {
				continue;
			}
			switch (prevRand) {
				case 0:
				case 4:
				case 6:
				case 8:
				case 10:
					if (rand==0||rand==3||rand==5||rand==7||rand==9) {
						flag = false;
					}
					break;
				case 1:
				case 3:
				case 7:
					if (rand==1||rand==6||rand==10) {
						flag = false;
					}
					break;
				case 2:
				case 5:
				case 9:
					if (rand==2||rand==4||rand==8) {
						flag = false;
					}
					break;
			}
		}

		prevRand = rand;
		array[i] = rand;
	}
}

function drawRoad() {  //функция прорисовки дороги
	context.fillStyle = colorScheme.background;    //закрашивание фона
	context.fillRect(0,0,w,h);
	for (var i = 0; i < 100; i++) {  //цикл прорисовки 100 элементов
		switch (array[i]) {
			case 0:
				direct(x, y, "up");
				break;
			case 1:
				direct(x, y, "left");
				break;
			case 2:
				direct(x, y, "right");
				break;
			case 3:
				left(x, y, "up");
				break;
			case 4:
				left(x, y, "right");
				break;
			case 5:
				right(x, y, "up");
				break;
			case 6:
				right(x, y, "left");
				break;
			case 7:
				left_low(x, y, "up");
				break;
			case 8:
				left_low(x, y, "right");
				break;
			case 9:
				right_low(x, y, "up");
				break;
			case 10:
				right_low(x, y, "left");
				break;
		}
	}
}

function drawCar(ang) {
	context.translate(w/2, h * 0.75 );
	context.rotate(ang * Math.PI/180); 
	context.drawImage(imgCar, - imgCar.width/2 , - imgCar.height/2);
	context.rotate(-ang * Math.PI/180);
	context.translate( -(w/2), -(h*0.75));
}

function start() {
	btn.style.display = "none";
	prevRand = 0;
	x = 0,y = 0,xn = w/2-wRoad/2 ,yn = h; 
	angle = 0;
	flag_left = false;
	flag_right = false;
	x = xn-wRoad/2;
	y = yn;
	generateRoad();
	colorSchemeRandom();
	drawRoad();
	drawCar(angle);
	timer = setInterval(changePos, 25);
}

window.onload = function (){
	btn = document.getElementById("retry");
	x = xn-wRoad/2;
	y = yn;
	generateRoad();
	colorSchemeRandom();
	drawRoad();
	drawCar(angle);
	timer = setInterval(changePos, 25);
}



window.onkeydown = function (e) {
	if (e.keyCode == 37) {
		flag_left = true;
	}
	
	if (e.keyCode == 39) {
		flag_right = true;
	}
}

window.onkeyup = function (e) {
	if (e.keyCode == 37) {
		flag_left = false;
	}
	
	if (e.keyCode == 39) {
		flag_right = false;
	}
}

function colorSchemeRandom() {
	var rand;
	do{
		rand = Math.round(Math.random() * (6 - 0) + 0);
	} while (rand == prevRandScheme);

	prevRandScheme = rand;
	switch (rand) {
		case 0:
			colorScheme.road = "#F9AE8F";
			colorScheme.background = "#EAD7B6";
			break;
		case 1:
			colorScheme.road = "#BCDED5";
			colorScheme.background = "#E5C440";
			break;
		case 2:
			colorScheme.road = "#8281A7";
			colorScheme.background = "#D9D6B0";
			break;
		case 3:
			colorScheme.road = "#C2CFAE";
			colorScheme.background = "#A79277";
			break;
		case 4:
			colorScheme.road = "#FECD3D";
			colorScheme.background = "#242424";
			break;
		case 5:
			colorScheme.road = "#D3649D";
			colorScheme.background = "#ABA1E2";
			break;
	}
}

function changePos() {
	xn += 4*Math.sin(-angle * Math.PI/180);  //скорость движения
	yn += 4*Math.cos(-angle * Math.PI/180);
	x = xn;
	y = yn;
	drawRoad();
	if (collision()) {
		clearInterval(timer);
		btn.style.display = "block";
	}
	if (flag_left) {
		angle -= 4;  //скорость поворота менять здесь
	}
	if (flag_right) {
		angle += 4;
	}
	drawCar(angle);
}

function collision () {

	var imgData = context.getImageData(w/2-20*Math.sin(-(angle-26.5)*Math.PI/180), h * 0.75 - 20*Math.cos((angle-26.5)*Math.PI/180), 1, 1);
	var pixel = imgData.data;

	if (parseInt(colorScheme.background.substr(1,2),16)==pixel[0]&&
		  parseInt(colorScheme.background.substr(3,2),16)==pixel[1]&&
		  parseInt(colorScheme.background.substr(5,2),16)==pixel[2]) {
		return true;
	}
	
	imgData = context.getImageData(w/2+20*Math.sin((angle+26.5)*Math.PI/180), h * 0.75 - 20*Math.cos((angle+26.5)*Math.PI/180), 1, 1);
	pixel = imgData.data;

	if (parseInt(colorScheme.background.substr(1,2),16)==pixel[0]&&
		  parseInt(colorScheme.background.substr(3,2),16)==pixel[1]&&
		  parseInt(colorScheme.background.substr(5,2),16)==pixel[2]) {
		return true;
	}
	
	return false;
}
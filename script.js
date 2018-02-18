var canvas = document.getElementById("canvas");  //инициализация канваса
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
		canvas.width = w;
		canvas.height = h;
var sizeBlockRoad = 100;
var wRoad = 80;
var context = canvas.getContext("2d");
var prevRand = 0;
var x = 0,y = 0,xn = w/2,yn = h;  //глобальные переменные координат
var colorRoad = "#FFFFFF";
var colorBackground = "#FFA500"
var array = new Array();




function direct(rx, ry, route) {    //функция прорисовки прямого участка дороги
	context.fillStyle = colorRoad;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":	
			context.fillRect(rx, ry, wRoad, -sizeBlockRoad);
			y -= sizeBlockRoad;
			break;
		case "left":
			context.fillRect(rx, ry, -sizeBlockRoad, -wRoad);
			x -= sizeBlockRoad;
			break;
		case "right":
			context.fillRect(rx, ry, sizeBlockRoad, wRoad);
			x += sizeBlockRoad;
			break;
		
	}
}

function left(rx, ry, route) {    //функция прорисовки левого поворота
	context.fillStyle = colorRoad;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx-10, ry, 10, 0, -Math.PI/2, true);
			context.lineTo(rx-10, ry - wRoad);
			context.arc(rx-10, ry, wRoad + 10, -Math.PI/2, 0 );
			context.closePath();
			context.fill();
			x -= 10;
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
			break;
	}
}

function right(rx, ry, route) {   //функция прорисовки правого поворота
	context.fillStyle = colorRoad;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx + wRoad + 10, ry, wRoad +10, Math.PI, -Math.PI/2, false);
			context.lineTo(rx + wRoad + 10, ry - 10);
			context.arc(rx + wRoad + 10, ry, 10, -Math.PI/2, Math.PI, true);
			context.closePath();
			context.fill();
			x += wRoad+10;
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
			break;
	}
}

function generateRoad(argument) {
	for (var i = 0; i < 50; i++) {  //формирование массив последовательности элементов дороги
		var rand = 0;
		var flag = true;

		while (flag) {             //алгоритм корректной последовательности элементов дороги
			rand = Math.round(Math.random() * (7 - 0) + 0);
			if ((prevRand==0&&rand==0)||
				  (prevRand==1&&rand==1)||
				  (prevRand==2&&rand==2)) {
				continue;
			}
			switch (prevRand) {
				case 0:
				case 4:
				case 6:
					if (rand==0||rand==3||rand==5) {
						flag = false;
					}
					break;
				case 1:
				case 3:
					if (rand==1||rand==6) {
						flag = false;
					}
					break;
				case 2:
				case 5:
					if (rand==2||rand==4) {
						flag = false;
					}
					break;
				case 4:
					if (rand==1||rand==3||rand==5) {
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
	context.fillStyle = colorBackground;    //закрашивание фона
	context.fillRect(0,0,w,h);
	for (var i = 0; i < 50; i++) {  //цикл прорисовки 50 элементов
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
		}
	}
}

window.onload = function () {
	x = xn;
	y = yn;
	generateRoad();
	drawRoad();
}

window.onkeydown = function (e) {
	if (e.keyCode == 38) {
		yn -= 6
	}
	if (e.keyCode == 40) {
		yn += 6
	}
	if (e.keyCode == 37) {
		xn -= 6
	}
	if (e.keyCode == 39) {
		xn += 6
	}
	x = xn;
	y = yn;
	drawRoad();
	

}
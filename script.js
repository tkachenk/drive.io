var canvas = document.getElementById("canvas");  //инициализация канваса
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
		canvas.width = w;
		canvas.height = h;
var sizeBlockRoad = 100;
var wRoad = 80;
var context = canvas.getContext("2d");
var prevRand = 0;
var x = 0,y = 0,xn = w/2-wRoad/2 ,yn = h;  //глобальные переменные координат
var colorRoad = "#FFFFFF";
var colorBackground = "#FFA500";
var colorCar = "#000000";
var array = new Array();
var angle = 0;
var imgCar = new Image();
		imgCar.src = "car.png";
var flag_left = false;
var flag_right = false;


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

function left_low(rx, ry, route) {    //функция прорисовки левого поворота
	context.fillStyle = colorRoad;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx-80, ry, 80, 0, -Math.PI/2, true);
			context.lineTo(rx-80, ry - wRoad);
			context.arc(rx-80, ry, wRoad + 80, -Math.PI/2, 0 );
			context.closePath();
			context.fill();
			x -= 80;
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

function right_low(rx, ry, route) {   //функция прорисовки правого поворота
	context.fillStyle = colorRoad;  //route - входное направление движения по дороге 
	switch (route) {
		case "up":
			context.beginPath();
			context.arc(rx + wRoad + 80, ry, wRoad +80, Math.PI, -Math.PI/2, false);
			context.lineTo(rx + wRoad + 80, ry - 80);
			context.arc(rx + wRoad + 80, ry, 80, -Math.PI/2, Math.PI, true);
			context.closePath();
			context.fill();
			x += wRoad+80;
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
			break;
	}
}

function generateRoad(argument) {
	for (var i = 0; i < 5; i++) {
		array[i] = 0;
	}
	for (var i = 5; i < 50; i++) {  //формирование массив последовательности элементов дороги
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
	context.translate(w/2, h * 0.75 - imgCar.height/2);
	context.rotate(ang * Math.PI/180); 
	context.drawImage(imgCar, - imgCar.width/2 , - imgCar.height/2);
	context.rotate(-ang * Math.PI/180);
	context.translate( -(w/2), -(h*0.75-imgCar.height/2));
}

window.onload = function () {
	x = xn;
	y = yn;
	generateRoad();
	drawRoad();
	drawCar(angle);
	setInterval(changePos, 25);
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

function changePos() {
//	if (!collision()) {
		if (flag_left) {
			angle -= 3;  //скорость поворота менять здесь
		}
		if (flag_right) {
			angle += 3;
		}
		xn += 4*Math.sin(-angle * Math.PI/180);  //скорость движения
		yn += 4*Math.cos(-angle * Math.PI/180);
		x = xn;
		y = yn;
		drawRoad();
		drawCar(angle);
//	}
}

function collision () {
	var imgData = context.getImageData(w/2-imgCar.width/2, h * 0.75 - imgCar.width/2 , imgCar.width, imgCar.width);
	var pixels = imgData.data;
	var k = 0;
	for (var i = 0; n = pixels.length, i < n; i += 4) {
		var red = pixels[i];
		var green = pixels[i+1];
		var blue = pixels[i+2];
		if (red==255 && green==165 && blue==0) {
			k++;
			if (k>200) {
				return true;
			}
		}
	}
	return false;
}
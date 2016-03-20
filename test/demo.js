function load(){

	/*
	* before load setting
	*/
	SlEEPBAG.canvasAutoResizer.load(function(self){
		self.canvasWidth = 500;
		self.canvasHeight = 500;
		var canvas = document.createElement("canvas");
		var gameArea = self.getGameArea();
		document.body.appendChild(gameArea);
		self.appendGameElement(canvas);
	});

	setButtons();
	var myTimer = setInterval(loop,20);
}

function setButtons(){

	var button_Full = document.createElement('button');
	var t = document.createTextNode("Full");
	button_Full.appendChild(t);

	var button_Center = document.createElement('button');
	var t = document.createTextNode("Center");
	button_Center.appendChild(t);

	var container = document.createElement('div');
	container.style.position = "absolute";
	container.style.top = "0";
	container.style.left = "0";

	container.appendChild(button_Full);
	container.appendChild(button_Center);

	/*
	* button click trigger setFull
	*/
	button_Full.addEventListener("click",function(e){
		SlEEPBAG.canvasAutoResizer.setFull();
	},false);

	/*
	* button click trigger setCenter
	*/
	button_Center.addEventListener("click",function(e){
		SlEEPBAG.canvasAutoResizer.setCenter();
	},false);

	document.body.appendChild(container);
}

function loop(){
	var c = SlEEPBAG.canvasAutoResizer.getGameElement();
	var resulotion = SlEEPBAG.canvasAutoResizer.getResolution();

	var ctx = c.getContext("2d");
	ctx.moveTo(0,0);
	ctx.lineTo(resulotion.width,0);
	ctx.lineTo(resulotion.width,resulotion.height);
	ctx.lineTo(0,resulotion.height);
	ctx.lineTo(0,0);
	ctx.stroke();

	var centerX = resulotion.width / 2;
	var centerY = resulotion.height / 2;
	var width = 30;
	ctx.fillStyle = "#FF0000";
	ctx.fillRect( centerX - width/2, centerX - width/2,width,width);

	ctx.font = "30px Arial";
	ctx.fillText("Hello World",10,50);

	ctx.beginPath();
	ctx.arc(100,100,40,0,2*Math.PI);
	ctx.stroke();

	// Create gradient
	var grd = ctx.createLinearGradient(0,0,200,0);
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"white");

	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(100,300,150,80);
}

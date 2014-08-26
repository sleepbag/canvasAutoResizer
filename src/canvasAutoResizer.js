this.SlEEPBAG = this.SlEEPBAG || {};

/* 
* 
* reference by http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/
* single instance, control the gameArea and canvas size
*/
SlEEPBAG.canvasAutoResizer = (function(){

	/*
	* private variable
	*/
	var gameArea = null;
	var gameCanvas = null;

	var domContainerID = "gameArea";
	var canvasID = "gameCanvas";

	var self = {};

	/*
	* Resolution Setting
	* there are default value
	*/

	self.canvasWidth = 800;
	self.canvasHeight = 400;
	

	initGameArea();
	

	/*
	* first use the ScreenSizeManager, must call this method
	*
	* @method load
	* @param {beforeload} before loading the fixed setting
	*/
	self.load = function load(beforeload) {
		if(beforeload){
			beforeload(self);
		}
		createCanvas();
		self.defaultStrategy();
	}

	/*
	* set the gameArea at center of container
	* and binding the resize event
	*/
	self.setCenter = function setCenter(){

		/*
		* I want the gameArea can append to saveral container like div
		* and relative position to it parent, so I comment the code
		* gameArea.style.position = "absolute";
		*/
		gameArea.style.position = "relative";

		gameArea.style.left = "50%";
		gameArea.style.top = "50%";

		resizeGame();
		var parentNode = gameArea.parentNode;
		parentNode.addEventListener('resize', resizeGame, false);
		window.addEventListener('resize', resizeGame, false);
		window.addEventListener('orientationchange', resizeGame, false);
	}

	/*
	* set the gameArea full of container
	* and unbinding the resize event
	*/
	self.setFull =  function setFull(){
		gameArea.style.position = "relative";
		gameArea.style.left = "0%";
		gameArea.style.top = "0%";
		var parentNode = gameArea.parentNode;
		parentNode.removeEventListener('resize', resizeGame, false);
		window.removeEventListener('resize', resizeGame, false);
		window.removeEventListener('orientationchange', resizeGame, false);
		gameArea.style.marginTop = 0;
		gameArea.style.marginLeft = 0;
		gameArea.style.height = "100%";
		gameArea.style.width = "100%";
	}


	/*
	* default resize Strategy 
	*/
	self.defaultStrategy = self.setCenter;


	/*
	* create the canvas, put in and fit the gameArea
	*/
	function createCanvas(){
		var createCanvas = document.createElement("canvas");
		gameArea.appendChild(createCanvas);
		createCanvas.id = canvasID;
		gameCanvas = createCanvas;
		gameCanvas.width = self.canvasWidth;
		gameCanvas.height = self.canvasHeight;
		gameCanvas.style.top = "0";
		gameCanvas.style.bottom = "0";
		gameCanvas.style.right = "0";
		gameCanvas.style.width = "100%";
		gameCanvas.style.height = "100%";
	}


	/*
	* create gameArea, which is container of game canvas
	*/
	function initGameArea() {
		gameArea = document.createElement('div');
		gameArea.setAttribute("id", domContainerID);
	}

	

	/*
	* resize gameArea
	*/
	function resizeGame() {

			var aspectRatio = self.canvasWidth / self.canvasHeight;
			var parentNode = gameArea.parentNode;
			var newWidth = parentNode.clientWidth;
			var newHeight = parentNode.clientHeight;
			var newWidthToHeight = newWidth / newHeight;
			
			if (newWidthToHeight > aspectRatio) {
				newWidth = newHeight * aspectRatio;
				gameArea.style.height = newHeight + 'px';
				gameArea.style.width = newWidth + 'px';
			} else {
				newHeight = newWidth / aspectRatio;
				gameArea.style.width = newWidth + 'px';
				gameArea.style.height = newHeight + 'px';
			}
			  
			
			/*
			* if in method setCenter(), we use " gameArea.style.position = "absolute"; "
			* then use this code.
			* gameArea.style.marginTop = (-newHeight * 1 / 2 ) + 'px';
			*/

			/*
			* because of " gameArea.style.position = "relative" ", 
			* above the gameArea will produce a 8px Row Height and cause scroll-bar of container.
			* so we reduce the magic number "8" of margin top
			*/
			gameArea.style.marginTop = (-newHeight * 1 / 2 ) - 8 + 'px';
			gameArea.style.marginLeft = (-newWidth * 1 / 2) + 'px';

			/*
			* reset the resolution
			*/
			gameCanvas.width = self.canvasWidth;
			gameCanvas.height = self.canvasHeight;
		}

	self.getGameCanvas = function getGameCanvas() {
		return gameCanvas;
	}

	self.getGameArea = function getGameArea() {
		return gameArea;
	}

	self.getResolution = function getResolution() {
		return {
			width: self.canvasWidth,
			height: self.canvasHeight
		};
	}

	return self;
})();

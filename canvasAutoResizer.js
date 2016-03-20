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
	var gameElement = null;

	var domContainerID = "gameArea";
	var canvasID = "gameElement";

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
			document.body.overflow ="hidden";
			beforeload(self);
		}

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

	self.setFix = function setFix(width,height){


		gameArea.style.position = "relative";
		gameArea.style.height = height + 'px';
		gameArea.style.width = width + 'px';

		fixResizeGame();
		var parentNode = gameArea.parentNode;
		parentNode.addEventListener('resize', fixResizeGame, false);
		window.addEventListener('resize', fixResizeGame, false);
		window.addEventListener('orientationchange', fixResizeGame, false);
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
		var parentNode = gameArea.parentNode;

	}


	/*
	* default resize Strategy
	*/



	/*
	* create the canvas, put in and fit the gameArea
	*/
	self.appendGameElement = function appendGameElement(element){

		gameElement = element;
		gameArea.appendChild(element);
		gameElement.width = self.canvasWidth;
		gameElement.height = self.canvasHeight;
		gameElement.style.top = "0";
		gameElement.style.bottom = "0";
		gameElement.style.right = "0";
		gameElement.style.width = "100%";
		gameElement.style.height = "100%";
		gameElement.style.display = "block";
	}


	/*
	* create gameArea, which is container of game canvas
	*/
	function initGameArea() {
		gameArea = document.createElement('div');
		gameArea.setAttribute("id", domContainerID);
	}

  function fixResizeGame(){

		var aspectRatio = self.canvasWidth / self.canvasHeight;
		var parentNode = gameArea.parentNode;
		var newWidth = parentNode.clientWidth;
		var newHeight = parentNode.clientHeight;
		var newWidthToHeight = newWidth / newHeight;



		gameArea.style.marginTop = (-gameArea.style.height * 1 / 2 ) + 'px';
		gameArea.style.marginLeft = (-gameArea.style.width * 1 / 2) + 'px';


		gameArea.style.left = (newWidth / 2 - self.canvasWidth * 1 / 2) + 'px';
		gameArea.style.top = (newHeight / 2 - self.canvasHeight * 1 / 2) + 'px';

		//gameArea.style.left = newWidth / 2 + 'px';
		//gameArea.style.top = newHeight / 2 + 'px';

		/*
		* reset the resolution
		*/
		if(gameElement){
			gameElement.width = self.canvasWidth;
			gameElement.height = self.canvasHeight;
		}

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


			gameArea.style.marginTop = (-newHeight * 1 / 2 ) + 'px';
			gameArea.style.marginLeft = (-newWidth * 1 / 2) + 'px';

			/*
			* reset the resolution
			*/
			if(gameElement){
				gameElement.width = self.canvasWidth;
				gameElement.height = self.canvasHeight;
			}
		}

	self.getGameElement = function getGameElement() {
		return gameElement;
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

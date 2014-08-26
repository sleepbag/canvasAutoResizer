canvasAutoResizer
=================
Reference by [Auto-Resizing HTML5 Games](http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/), I implemented the function, and I want make this reusable, so I wrote a this.

For HTML5-canvas, auto resize and reposition the canvas that we want make a game or app.
you can set resolution and resize strategy dynamically.here is a example use [auto resize canvas]( http://gurintara.com/project/canvasAutoResizer/test/).

## Example  usage
	/*
	* before load setting, you can set your resolution
	* and append on dom container
	*/
	SlEEPBAG.canvasAutoResizer.load(function(self){
		// set resolution
		self.canvasWidth = 500;
		self.canvasHeight = 500;
		// get game area 
		var gameArea = self.getGameArea();
		// append on 
		document.body.appendChild(gameArea);
	});
	
	var resizer = SlEEPBAG.canvasAutoResizer;

	// get canvas
	var canvas = resizer.getGameCanvas();
	// get resolution
	var resoultion = resizer.getResolution();
	
	// set resize to center 
	resizer.setCenter();
	
	// set full container, and ignore Aspect Ratio
	resizer.setFull();
	
	//..and then you can make your canvas game..

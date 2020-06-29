/*
402 - The case of the Why Gang ruby heist
Stage 4 - Fox

Officer: 3185280
CaseNum: 402-3-78542461-3185280

This final Why gang member Fox is the boss of the gang. Fox is particularly
cunning and has hidden herself down this twisted network of alleys known as
vice city. Head into vice city to find her but don’t get lost!

The gang is still in the dark about our code, not the brightest pixels in the
city!

North: detSpeedX = 0 and detSpeedY = -1
East: detSpeedX = 1 and detSpeedY  = 0
South: detSpeedX = 0 and detSpeedY = 1
West: detSpeedX = -1 and detSpeedY = 0

*/

var currentRoad;
var direction;
var mapImage;
var overlayImage;

var det = {
	"speedX": 0,
	"speedY": 0,
	"locationX": 763,
	"locationY": 696,
	"image": "./det.png"
};

function preload()
{
	perp.image = loadImage(perp.image);
	det.image = loadImage(det.image);
	mapImage = loadImage("./map.png");
	overlayImage = loadImage("./overlay.png")
}

function setup()
{
	createCanvas(1024, 768);
}

function draw()
{

	///////////////////ADD YOUR CODE HERE///////////////////
	if (det.locationY > 509)
	{
		det.speedX = 0;
		det.speedY = -1;
	}
    if (det.locationY == 508 && det.locationX > 198)
	{
		det.speedX = -1;
		det.speedY = 0;
	}
    if (det.locationY > 383  && det.locationX == 199)
	{
		det.speedX = 0;
		det.speedY = -1;
	}
    if (det.locationY == 384  && det.locationX < 576)
	{
		det.speedX = 1;
		det.speedY = 0;
	}
    if (det.locationY > 257  && det.locationX == 575)
	{
		det.speedX = 0;
		det.speedY = -1;
	}
    if (det.locationY == 258  && det.locationX > 324)
	{
		det.speedX = -1;
		det.speedY = 0;
	}
    if (det.locationY > 134  && det.locationX == 325)
	{
		det.speedX = 0;
		det.speedY = -1;
	}
    if (det.locationY == 135  && det.locationX < 825)
	{
		det.speedX = 1;
		det.speedY = 0;
	}
    if (det.locationY > 67  && det.locationX == 825)
	{
		det.speedX = 0;
		det.speedY = -1;
	}
    if (det.locationY == 68  && det.locationX > 137)
	{
		det.speedX = -1;
		det.speedY = 0;
	}
    if (det.locationY > 0  && det.locationX == 137)
	{
		det.speedX = 0;
		det.speedY = -1;
	}

    
	///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

	background(50);

	det.locationX += det.speedX;
	det.locationY += det.speedY;

	//draw the images of the map perp and the detective
	image(mapImage, 0, 0);
	image(overlayImage, 0, 0);
	image(perp.image, perp.locationX - roadWidth, perp.locationY - roadWidth, roadWidth * 2, roadWidth * 2);

	push();
	translate(det.locationX, det.locationY);
	if (det.speedX != 0) rotate((det.speedX - 1.5) * PI);
	else if (det.speedY < 0) rotate(PI);
	image(det.image, -roadWidth, -roadWidth, roadWidth * 2, roadWidth * 2);
	pop();

	push();
	textAlign(CENTER);
	textSize(32);
	noStroke();

	//the perp has been caught
	if (dist(det.locationX, det.locationY, perp.locationX, perp.locationY) < roadWidth / 2)
	{
		//display message to the player
		fill(0, 220, 0);
		text("Just in the nick of time! \nYou caught " + perp.name, width / 2, height / 2);
		perp.caught = 1;
		noLoop();
	}

	//not on any roads, therefore the game is lost.
	if (!getOnRoad() || (det.speedX == 0 && det.speedY == 0))
	{
		fill(255, 0, 0);
		text("You let " + perp.name + " get away.\n Better luck next time.", width / 2, height / 2);
		perp.caught = -1;
		noLoop();
	}

	pop();

	hud();

}

function hud()
{
	push();
	fill(250);
	noStroke();
	textAlign(LEFT, TOP);
	text("detective location - x: " + det.locationX + " y: " + det.locationY, 5, 5);
	pop();
}

function getOnRoad()
{

	if (mapImage.get(det.locationX, det.locationY)[0] == bckgrndColour)
	{
		return false;
	}

	return true;
}

var roadWidth = 25;
var bckgrndColour = 50;
var perp = {
	"caught": 0,
	"name": "Fox",
	"image": "./perp.png",
	"locationX": 136,
	"locationY": 10
};
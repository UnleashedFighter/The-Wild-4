var PLAY = 1;
var END = 0;
var gameState = PLAY;

var lion, lion_running 
var zebra, zebraImage
var bg   
var score
var zebraGroup
 





function preload(){
lion_running = loadAnimation("images/lion1.png","images/lion2.png", "images/lion3.png", "images/lion4.png")
lion_running1 = loadAnimation("images/lion5.png","images/lion6.png", "images/lion7.png", "images/lion8.png")
zebraImage = loadImage("images/zebra.png")
bg = loadImage("images/jungle.jpg")
lionstop = loadAnimation("images/lion1.png")
}


function setup() {
createCanvas(displayWidth,displayHeight - 150);
lion = createSprite(150,200,40,50)
lion.addAnimation("lion_running", lion_running)
lion.addAnimation("lionstop" , lionstop);
lion.addAnimation("lion_running1", lion_running1)
lion.scale =0.3
zebraGroup = new Group();
score = 0;

}

function draw() { 
  background(bg)
  drawSprites();

  textSize(30);
  fill("yellow");
  text("SCORE: " + score, displayWidth-300, 30)

  if(keyDown("LEFT_ARROW")){
    lion.changeAnimation("lion_running1", lion_running1);
    lion.velocityX = -(3 + score/50);
  }

  if(keyDown("RIGHT_ARROW")){
    lion.changeAnimation("lion_running", lion_running);
    lion.velocityX = +(3 + score/50);
  }

  if(keyDown("UP_ARROW")){  
    lion.velocityY = -(3 + score/50);
  }

  if(keyDown("DOWN_ARROW")){
  lion.velocityY = +(3 + score/50);

  }

if (zebraGroup.isTouching(lion)){
   zebraGroup.destroyEach();
   score = score + 50

if(score == 1000){
  gameState = END;
 }
}

else if (gameState === END) {
  lion.velocityX = 0;
  lion.velocityY = 0;
  zebraGroup.setLifetimeEach(-1);
  lion.changeAnimation("lionstop",lionstop)
  textSize(100);
  fill("blue");
  text("You Win", displayWidth/2 -200 , displayHeight/2 );
}


  edges = createEdgeSprites()
  lion.collide(edges);
                                   
  spawnZebras()
}

function spawnZebras(){
if(frameCount%120 === 0 && gameState!= END){
zebra = createSprite(600,400,50,50)
zebra.x = Math.round(random(50,1800))
zebra.y = Math.round(random(50,800))
zebra.addImage("zebraImage", zebraImage)
zebra.scale = 0.25
zebra.lifetime = 200;
zebra.depth = lion.depth;
lion.depth = lion.depth + 1;
zebraGroup.add(zebra);
}

}
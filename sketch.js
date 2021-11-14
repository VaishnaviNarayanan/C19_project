var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(100,500)
  ghost.addImage("ghost-standing",ghostImg)
  ghost.scale=0.5
  
  climbersGroup = createGroup()
  doorsGroup = createGroup()
}

function draw() {
  background(0);
 
  if(gameState==="play"){
    spawnObstacles()
    if(tower.y > 400){
        tower.y = 300
      }
    if(keyDown("SPACE")){
      ghost.velocityY=-4
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+10
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-10
    }
    ghost.velocityY=ghost.velocityY+0.5
    if(ghost.isTouching(climbersGroup)||ghost.y>600){
      gameState="end"
     }
  }
  if(gameState==="end"){
    climbersGroup.destroyEach()
    doorsGroup.destroyEach()
    tower.destroy()
    ghost.destroy()
    textSize(20)
    text("GAME OVER",250,300)
  }
  
    drawSprites()
}
function spawnObstacles(){
  if(frameCount%150===0){
door = createSprite(random(52,550),-40)
door.addImage("door",doorImg)
door.velocityY=2
doorsGroup.add(door)
climber = createSprite(door.x,10)
climber.addImage("climber",climberImg)
climber.velocityY=2
climbersGroup.add(climber)
  }
}

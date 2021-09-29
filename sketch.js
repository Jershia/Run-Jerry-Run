var PLAY=1;
var END=0 ;
var START;
var gameState = START;
var float1,float2,floatsGroup;
var ground,groundImage;
var sky,skyImage;
var girl,girlImage;
var girl_standing,girl_standing1;
var invisibleGround;
var fireGround,fireGroundImage;
var fireGround1,fireGround1Image;
var coin,coinImage,coinsGroup;
var hill,hillImage;
var restart,restartImage;
var coinSound,gameOverSound;
var Score;

function preload(){
float1 = loadImage("float-removebg-preview.png");
float2 = loadImage("float3-removebg-preview-1.png");
groundImage = loadImage("ground.png");
skyImage = loadImage("cloud.png");
fireGroundImage = loadImage("fire.png");
fireGround1Image = loadImage("fire-1.png")
coinImage= loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
hillImage = loadImage("hill.png");
girl_standing = loadAnimation("spritestrip5-1.png");
girl_standing1 = loadAnimation("spritestrip5-2.png");
girlImage = loadAnimation("spritestrip1.png","spritestrip2.png","spritestrip3.png","spritestrip4.png","spritestrip5.png","spritestrip6.png");
restartImage = loadImage("restart1.png");
coinSound = loadSound("Coin Sound.wav");
gameOverSound = loadSound("GameOver Sound.wav");
}

function setup(){
  createCanvas(600,400)
  floatsGroup = createGroup();
  coinsGroup = createGroup();
  sky = createSprite(400,340,600,600);
  sky.addImage(skyImage);
  sky.scale =2;
  ground = createSprite(400,340,600,600);
  ground.addImage(groundImage);
  ground.scale = 0.2;
  girl = createSprite(50,190,20,50);
  girl.addAnimation("standing",girl_standing);
  girl.addAnimation("standing",girl_standing1);
  girl.addAnimation("running",girlImage);
  girl.scale = 0.3;
  invisibleGround = createSprite(400,330,800,10);
  invisibleGround.visible = false;
  fireGround = createSprite(250,330,600,600)
  fireGround.addImage(fireGroundImage)
  fireGround.scale=0.07;
  fireGround1 = createSprite(550,330,600,600)
  fireGround1.addImage(fireGround1Image)
  fireGround1.scale=0.07;
  hill = createSprite(50,320,10,10);
  hill.addImage(hillImage);
  hill.setCollider("rectangle",0,0,0,160);
  restart = createSprite(300,200);
  restart.addImage(restartImage);
  restart.scale = 0.8;
  restart.visible = false;
  Score = 0;
}
function draw(){
background("yellow");
  girl.velocityY = girl.velocityY + 0.8;
if(gameState === START){
    girl.visible = false;
    hill.visible = false;
    restart.visible = false;
    fireGround.visible = false;
    fireGround1.visible = false;
    ground.visible = false;
    fireGround.visible = false;
    fireGround1.visible = false;
    sky.visible = false;
    girl.collide(hill)
    background("black");  
    //To declare instructions
    textSize(20);
    fill("white");
    text("Read all the instructions before playing the game",50,100);
    text("1.Press Space Key to escape fire",50,140);
    text("2.Collect coins to score the points",50,170);
    text("3.Jump on the floats to rest",50,200);
    textSize(40);
    text("ALL THE BEST!!",150,300);
    textSize(28);
    text("Press Space Key to Start the Game",70,350);
    
if (keyWentDown("space")){
  gameState = PLAY;
  girl.visible = true;
   hill.visible = true;
  restart.visible = false;
    fireGround.visible = true;
    fireGround1.visible = true;
    ground.visible = true;
    sky.visible = true;
    girl.collide(hill)
}
}
if(gameState === PLAY){
    girl.changeAnimation("running",girlImage);
 if(keyDown("space")&& girl.y >= 100) {
      girl.velocityY = -12;
  }
   hill.visible = false;
    restart.visible = false;
    fireGround.visible = true;
    fireGround1.visible = true;
    sky.velocityX =-1;
 if (sky.x < 0){
     sky.x=380;
    }  
 if (girl.x>0){
  girl.x = 50;
  }
  girl.velocityY = girl.velocityY + 0.8;
ground.velocityX =- 3
   if (ground.x < 0){
     ground.x=380;
   }
 girl.collide(invisibleGround);
if (girl.isTouching(floatsGroup)){
  girl.collide(floatsGroup);
}
  spawnFloats();
if(girl.isTouching(coinsGroup)){
  Score = Score + 1;
  coinsGroup.destroyEach();
  coinSound.play();
}
if(girl.isTouching(invisibleGround)){
  gameState = END;
  gameOverSound.play();
}
}
if (gameState === END){
    girl.changeAnimation("standing",girl_standing1);
    restart.visible = true;
    girl.velocityY = 0;
    girl.velocityX = 0;
    coinsGroup.setLifetimeEach(-1);
    floatsGroup.setLifetimeEach(-1);   
    coinsGroup.setVelocityXEach(0);
    floatsGroup.setVelocityXEach(0); 
    sky.velocityX=0;
    ground.velocityX=0;
    floatsGroup.destroyEach();
    coinsGroup.destroyEach();
if(mousePressedOver(restart)){
  reset();
}
}

  drawSprites();
  textSize(25);
  fill("red");
  text("Coins Collected : " + Score,350,50);
}
function reset(){
  girl.x = 50;
  girl.y = 190;
  hill.visible = true;
  hill.collide(girl)
  gameState = START;
  restart.visible = false;
  girl.collide(invisibleGround);
  Score=0;
}
function spawnFloats(){
if (frameCount % 80 === 0){
  var floats = createSprite(400,165,10,40);
  floats.y = Math.round(random(150,250));
  floats.velocityX = -3
  floats.addImage(float2);
    floats.scale = 0.3;
    floats.lifetime = 300;
    girl.collide(floats);
    floats.setCollider("rectangle",10,50,50,10);
    floatsGroup.add(floats);
}
  if (frameCount % 180=== 0){
  coin = createSprite(400,165,20,50);
  coin.addAnimation("rotation", coinImage);
 coin.y = Math.round(random(100,200));
  coin.velocityX = -3
  coin.scale = 0.4;
  coinsGroup.add(coin) 
}
}

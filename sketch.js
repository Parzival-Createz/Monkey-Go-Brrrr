
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,backgroundImg, bg1, bg2, ground;
var foodGroup, obstacleGroup;
var score = 0;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg = loadImage("Forest.jpeg");
  
}



function setup() {
  createCanvas(500,350);
  
  bg1 = createSprite(260,170,10,10);
  bg1.addAnimation("Forest", backgroundImg);
  bg1.scale = 1.2;
  bg2 = createSprite(780,170,10,10);
  bg2.addAnimation("forest", backgroundImg);
  bg2.scale = 1.2;
  
  monkey = createSprite(50,230,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  monkey.setCollider("rectangle",0,0,monkey.width-100,monkey.height-100);
  // monkey.debug = true;
  // console.log(monkey.height);
  // console.log(monkey.width);
  
  ground = createSprite(300,290,600,20);
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);
  
  text.depth = 5;
  
  bg1.depth = 0.1;
  bg2.depth = 0.1;
  
  if (gameState === PLAY) {
    // console.log(score);
    
    
    bg1.velocityX = -7.5;
    bg2.velocityX = -7.5;
    
    if(bg1.x<-260) {
      bg1.x = 260;
      bg2.x = 780;
    }
    
    // Gravity
    monkey.velocityY += 0.5;
    
    if(keyDown("space") && monkey.y>225) {
      monkey.velocityY = -11.5;
    }
    
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score += 1;
    }
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
    
    spawnBanana();
    spawnObstacles();
  }
  if(gameState === END) {
    
    monkey.visible = false;
    
    textSize(15);
    text("Press Space to restart",330,17)
    bg1.velocityX = 0;
    bg2.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    if(keyWentDown("space")) {
      reset();
    }
  }
  monkey.collide(ground);
  
  textSize(21);
  fill("black");
  text("Score : " + score,5,19);
  
  drawSprites();
}

function reset() {
  gameState = PLAY;
  score = 0;
  monkey.visible = true;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
}

function spawnBanana() {
  if (frameCount%200 === 0) {
    var x = Math.round(random(100,180));
    banana = createSprite(625,x,10,10);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -7.5;
    banana.lifetime = 300;
    banana.scale = 0.09; 
    banana.setCollider("rectangle",0,0,banana.width,banana.height-100);
    // banana.debug = true;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount%300 === 0) {
    obstacle = createSprite(625,260,10,10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -7.5;
    obstacle.lifetime = 300;
    obstacle.scale = 0.12;
    // obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,(obstacle.width-200),(obstacle.height-200));
    obstacleGroup.add(obstacle);
  }
}
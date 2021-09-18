var ground, groundImage;
var invisibleGround;
var player, playerAnimation;
var coin, coinAnimation, coinsGroup;
var cloud, cloudImage, cloudGroup;
var obstacle, obstacleImage, obstacleGroup;
var gameOver, gameOverAnimation;

var gamemusic;

var Play = 1;
var End = 0;
var gameState = Play;

var score = 0;

function preload(){
  playerAnimation = loadAnimation("Sprite1.jpg", "Sprite2.jpg", "Sprite3.jpg", "Sprite4.jpg", "Sprite5.jpg", "Sprite6.jpg", "Sprite7.jpg", "Sprite8.jpg", "Sprite9.jpg", "Sprite10.jpg", "Sprite11.jpg", "Sprite12.jpg");
  
  coinAnimation = loadAnimation("coins.gif");
  gameOverAnimation = loadAnimation("gameover.gif");
  
  groundImage = loadImage("Ground.png");
  cloudImage = loadImage("cloud.png"); 
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  
  coinsGroup = new Group();
  cloudGroup = new Group();
  obstacleGroup = new Group();  
  
  ground = createSprite(200, 180, 600, 20);
  ground.addImage("bg", groundImage);
  ground.scale = 3;
  
  invisibleGround = createSprite(200, 340, 400, 20);
  invisibleGround.visible = false;
  
  player = createSprite(60, 280, 20, 20);
  player.addAnimation("running", playerAnimation);
  player.scale = 0.5;
}

function draw() {
  background("white");
  
  if(gameState === Play) { 
    text("Score: " + score, 200, 200);
    
  ground.velocityX = -6;
  if(ground.x <0) {
    ground.x = ground.width/2;
  }
  
  player.velocityY = player.velocityY +0.8;
  if(keyDown("space")) {
    player.velocityY = -16;
  }
  
  if(coinsGroup.isTouching(player)) {
    coinsGroup.destroyEach();
    score = score +1;
  }
    
    if(obstacleGroup.isTouching(player)) {
      gameState = End;
    }
  
  player.depth = player.depth +100;
  
  player.collide(invisibleGround);  
  spawnCoins();
  spawnClouds();
  spawnObstacle();
  }
  
  if(gameState === End) {
    stroke("black");
    fill("red");
    text("IF YOU WANT TO RESTART PLEASE REFREASH THE PAGE", 10, 200);
    
    gameOver = createSprite(200, 200, 20, 20);
  gameOver.addAnimation("over", gameOverAnimation);
    
    cloudGroup.destroyEach();
    coinsGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.visible = false;
    invisibleGround.visible = false;
    player.visible = false;
    
    
    }
  
  drawSprites();
}

function spawnCoins() {
  if(frameCount %90 ===0) {
    
    coin = createSprite(410, 100, 20, 20);
    coin.addAnimation("coin", coinAnimation);
    coin.scale = 0.2;
    coin.velocityX = -6;
    coin.lifetime = 100;
    
    var rand = Math.round(random(1, 3));
    switch(rand) {
      case 1: coin.y = coin.y -40;
        break;
      case 2: coin.y = coin.y +30;
        break;
      case 3: coin.y = coin.y -30;
        break
      default: break;
    }
    
    coinsGroup.add(coin);
  
  }
}

function spawnClouds() {
  if(frameCount %160 ===0) {
    cloud = createSprite(410, 30, 20, 20);
    cloud.addImage("cloud", cloudImage);
    cloud.velocityX = -2;
    cloud.scale = 0.06;
    
    var rand = Math.round(random(1, 3));
      switch(rand) {
        case 1: cloud.y = cloud.y -20;
          break;
        case 2: cloud.y = cloud.y;
          break;
        case 3: cloud.y = cloud.y +30;
          break;
        default: break;
      }
    
   cloudGroup.add(cloud);

  }
}

function spawnObstacle() {
  if(frameCount % 90 ===0) {
    obstacle = createSprite(410, 300, 20, 20);
    obstacle.addImage("stop", obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    
    obstacle.setCollider("rectangle", 10, 10, 400, 700);
    
    obstacleGroup.add(obstacle);
  }
}
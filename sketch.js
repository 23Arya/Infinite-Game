//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//create variable for airplane
var airplane, airplaneImg;
//create variable for background
var background, backgroundImg;
var sky, skyImg;
var obstaclesGroup;
var fireball,fireballImg
//create invisible ground
var invisibleGround
//create gameover and restart
var gameover, gameoverImg;
var restart, restartImg;
//create score
var score
//create sounds
var checkPointSound;
var cloud, cloudImg;

function preload(){
  
  //load airplane Image
  airplaneImg = loadImage("airplane.png");
  //load background Image
  backgroundImg = loadImage("background.png");
  skyImg = loadImage("sky.png");
  //load obstacle images
  fireballImg = loadImage("fireball.png");
  //load gameover and restart
  gameoverImg = loadImage("game over.png");
  restartImg = loadImage("replay.png");
  //load sound
  checkPointSound = loadSound("checkPoint.mp3");

}

function setup() {
  createCanvas(600,400);

 
  //background
  background = createSprite(200,100);
  background.addImage("background", backgroundImg);
  background.scale = 1.5;
  background.velocityX = -2;
  
  //invisible ground
  invisibleGround = createSprite(1,390,4000,10);
  invisibleGround.visible = false;
  
  //airplane
  airplane = createSprite(45,350,50,50);
  airplane.scale = 0.4;
  airplane.addImage("airplane", airplaneImg);
  
  obstaclesGroup = createGroup();

  gameover = createSprite(300,200);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg); 
  
 
  gameover.scale = 0.5;
  restart.scale = 0.2;
  
  score = 0;
  
  background.depth = score.depth - 1;
  score.depth = score.depth + 1; 
  
  airplane.setCollider("rectangle",0,0,100,100);
  
  airplane.debug = true
  
} 

function draw() {     
  //displaying score
  text("Score: "+ score, 300,50);
    
 if(gameState === PLAY){
   
   background.velocityX = -(4 + 3* score/100)
    //scoring
   score = score + Math.round(getFrameRate()/60);
   
   
    gameover.visible = false;
    restart.visible = false;
  
    if(background.x < 0){

    background.x = width/2;
      
    }   

    if(airplane > 250){
      airplane.x = 350;
   }  

    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
   airplane.y = World.mouseY;
   
     spawnObstacles();
   
  airplane.velocityY = airplane.velocityY + 0.8
  
  airplane.collide(invisibleGround);
   
   
   if(obstaclesGroup.isTouching(airplane)){
        gameState = END;
   } 
   
 }
   else if (gameState === END) {

      gameover.visible = true;  
      restart.visible = true;
          
      if(mousePressedOver(restart)) {
        gameState = PLAY;
        obstaclesGroup.destroyEach();
        restart.visible = false;
        gameover.visible = false;
                
      }
  
         
     background.velocityX = 0;
      airplane.velocityY = 0
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);    
    
   }
  
 
  
 
  drawSprites();
} 

function spawnObstacles(){
  
  if (frameCount % 60 === 0) {
    var fireball = createSprite(350,350,40,10);
    fireball.velocityX = -(6 + score/100);
    fireball.x = Math.round(random(200,700));
    fireball.y = Math.round(random(10,390));
    fireball.addImage(fireballImg);
    fireball.scale = 0.5;
    fireball.velocityX = -3;
    
     //assign lifetime to the variable
    fireball.lifetime = 200;
    
    //adjust the depth
    fireball.depth = airplane.depth;
    airplane.depth = airplane.depth + 1;
    
    //add each cloud to the group
   obstaclesGroup.add(fireball);
  }
   }
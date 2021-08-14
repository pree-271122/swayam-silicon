var hero,heroImage;
var bg,bg1;
var aliens,aliens1;
var bullte1,bullet;
var helecopeter,helecopeter1;
var aliensGroup;
var bulletGroup;
var score=0;
var life=3;
var heart1,heart2;
var heart3;
var heart4;
var START=1;
var END = 0;
var ENTER=2;
var gameState=ENTER;
var gameover,gameoverImg;
var bullte2;
var alienship,alienship1;
var th2,start;


function preload(){
heroImage= loadImage("./images/swayam.png");  
bg1= loadImage("./images/bg3.jpg");
aliens1= loadImage("./images/aliens.png");
bullte1= loadImage("./images/bullet.png");
bullte2= loadSound("b.mp3");
helecopeter1= loadImage("./images/helecopeter.png");
heart4= loadImage("./images/heart.png");
gameoverImg=loadImage("./images/over.png");
alienship1=loadImage("./images/alienship.png");
th2=loadImage("./images/bg4.jpg");
start1=loadImage("./images/start.png")
bg5=loadImage("./images/bg5.jpg")
bg6=loadImage("./images/back2.jpg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  //background image
  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bg1);
  bg.scale = 1;
  bg.visible=false;
  
  bg2 = createSprite(width/2,height/2,width,height);
  bg2.addImage(th2);
  bg2.scale = 3;
  bg2.visible=true;

  bg3 = createSprite(width/2,height/2,width,height);
  bg3.addImage(bg5);
  bg3.scale = 3;
  bg3.visible=false;

  bg4 = createSprite(width/2,height/2,width,height);
  bg4.addImage(bg6);
  bg4.scale = 3;
  bg4.visible=false;

  //hero sprite
  hero = createSprite(150,height-220);
  hero.addImage(heroImage);
  hero.scale = 1.5;
  hero.debug=false;
  hero.visible=false
  hero.setCollider("circle",0,0,160)

  //helicopter sprite
  helecopeter = createSprite(600,100);
  helecopeter.addImage(helecopeter1);
  helecopeter.scale = 0.3;
  helecopeter.visible=false;
 

  helecopeter2 = createSprite(800,100);
  helecopeter2.addImage(helecopeter1);
  helecopeter2.scale = 0.3;
  helecopeter2.visible=false;

  helecopeter3 = createSprite(1000,300);
  helecopeter3.addImage(helecopeter1);
  helecopeter3.scale = 0.3;
  helecopeter3.visible=false;

  alienship = createSprite(1300,500);
  alienship.addImage(alienship1);
  alienship.scale = 0.1;
  alienship.visible=false

  start = createSprite(width/2,height/2);
  start.addImage(start1);
  start.scale = 0.1;
  


  //heart sprites
  heart1 = createSprite(50,50);
  heart1.addImage(heart4);
  heart1.scale = 0.3;
  heart2 = createSprite(120,50);
  heart2.addImage(heart4);
  heart2.scale = 0.3;
  heart3 = createSprite(190,50);
  heart3.addImage(heart4);
  heart3.scale = 0.3;

  //gameover
  gameover = createSprite(width/2,height/2);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.9;
  gameover.visible=false;

  //alien and bullet group
  aliensGroup=new Group()
  bulletGroup=new Group()
}

function draw() {
  background("skyblue");
  if(gameState===ENTER){
    bg.visible=false
   
  }
  if(mousePressedOver(start)){
    gameState=START;
  }
//START state
else if(gameState===START){
  bg.visible=true;
  bg2.visible=false
  start.visible=false
  helecopeter.visible=true;
  helecopeter2.visible=true;
  helecopeter3.visible=true;
  alienship.visible=true
  hero.visible=true
  
//alien function
spawnaliens();

//bullet shoot
if(keyDown("space")){
spawnbullet();
bullte2.play();
}
//score and destroy alen and hero
if(aliensGroup.isTouching(bulletGroup)){
  bulletGroup.destroyEach();
  aliensGroup.destroyEach();
  score=score+5;
  }
  //alien disappear
  if(aliensGroup.isTouching(hero)){
    aliensGroup.destroyEach();
    hero.visible=false;
    lifeover();
  }
}
else if(gameState===END){
  gameover.visible=true;
  bg2.visible=false
  start.visible=false

}
  
  drawSprites();
  fill("white");
  textSize(50);
  text("Score: "+ score, width-300,50); 
  text("Lives: "+ life, width-300,150);
}

function spawnaliens() {
  //write code here to spawn the clouds
   if (frameCount % 100 === 0) {
     aliens = createSprite(270,height-220,40,10);
    aliens.x = Math.round(random(600,800));
    aliens.addImage(aliens1);
    aliens.scale = 1;
    aliens.velocityX = -(3+ 3*score/10);
     //assign lifetime to the variable
    aliens.lifetime = 200;
    //adding cloud to the group
   aliensGroup.add(aliens);
  
   }
  }

  function spawnbullet() {
    //write code here to spawn the clouds
     if (frameCount % 10 === 0) {
       bullet = createSprite(220,height-285,40,10);
      //bullet.x = Math.round(random(60,80));
      bullet.addImage(bullte1);
      bullet.scale = 0.1;
      bullet.velocityX = 10;
       //assign lifetime to the variable
       bullet.lifetime=200;
      //adding cloud to the group
     bulletGroup.add(bullet);
     bulletGroup.depth=hero.depth;
     hero.depth=hero.depth+1;
     }
    }

    function lifeover(){
      life=life-1;
      if(life===3){
        heart1.visible=true;
        heart2.visible=true;
        heart3.visible=true;
        hero.visible=true

      }
      else if(life===2){
        heart1.visible=false;
        heart2.visible=true;
        heart3.visible=true;
        hero.visible=true
        bg3.visible=true;

      }
      else if(life===1){
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=true;
        hero.visible=true
      }
      else{
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=false;
        gameState=END;
        bg4.visible=true;
        bg3.visible=false;
        bg.visible=false;
        bg2.visible=false
      }
    }


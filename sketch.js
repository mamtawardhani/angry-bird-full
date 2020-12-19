const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var endcounter

var gameState;
var fired;
var score = 0;

function preload() {
    back=loadImage("sprites/Overlay.png")
    s1=loadImage("sprites/star2.png")
    s2=loadImage("sprites/star2.png")
    s3=loadImage("sprites/star2.png")
    pg=loadImage("sprites/enemyCritical.png")
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    s1Y=1000
    s2Y=1000
    s3Y=1000

    fired=false
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    gameState="playing"
    endcounter=0
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
       // console.log(pig3.body.speed)

        
       // if(gameState==="playing"){
            Engine.update(engine);
        //}
 
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 

push()
    imageMode(CENTER)
    image(s1, 475, s1Y,100,100)
    image(s2, 600, s2Y,100,100)
    image(s3, 725, s3Y,100,100)
    pop()

    if(bird.body.speed<0.4 && fired===true){
        endcounter++
        if(endcounter===20){
            gameState="over"
        }
        
    }

    if(gameState==="over"){
        if(score>0 && s1Y>200){
            s1Y-=6
        }
        if(score>=200 && s2Y>200){
            s2Y-=5
        }
        if(score>=300 && s2Y>200){
            s3Y-=5.5
        }

        text("Great job! ", 300,300)
        text("press Space to play again",300,350)
    }

   
}

function mouseDragged(){
   if(fired===false){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
       // fired=true
   }
}


function mouseReleased(){
    slingshot.fly();
   
    fired=true
   
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
       window.location.reload()
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldclockapi.com/api/json/est/now");
    var responseJSON = await response.json();

    var datetime = responseJSON.currentDateTime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

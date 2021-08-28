const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground,heart,heart2,heart3;
var lance,invisground,invisleft,invisright;
var house1,tree1,hin1;
var house2,tree2,tree3,hin2;
var house3,hin3;
var sword,goblin,goblin2,goblinImg;
var health = 3;
var coin;
var coins = 0;
var goblinstate =0;
var goblin2state =0;
var bed,bedImg;
var villager1;
var villager2;
var Trade = 0;
var tradeTab;
var bowImg,bow,bt,ca,cai,ca2,ca2i,buyb,buybi;
var bowget=false;
var wep="s";
var arrow,arrowImage,arrowImage2;
var arrows = 5;
var arrowcooldown = 0;
var jc = 0


var stage =0;


function preload(){
 goblinImg = loadImage("Goblin.png");
 bedImg = loadImage("bed.png");
 bowImg = loadImage("bow.png");
 cai = loadImage("coin.png");
 ca2i = loadImage("15.png");
 buybi = loadImage("buyb.png");
 arrowImage = loadImage("arrow.png");
 arrowImage2 = loadImage("arrow2.png");
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,400,900,70);



  lance = createSprite(400,346,30,50);
  lance.shapeColor = "red";



  invisground = createSprite(400,400,900,70);
  invisground.visible = false;
  invisleft = createSprite(-15,200,0.01,500);
  //invisleft.visible = false;
  invisright = createSprite(815,200,0.01,500);
  //invisright.visible = false;



  house1 = new House(500,265,200,200);
  hin1 = createSprite(house1.body.position.x+0.5,house1.body.position.y+40,120,120);
  hin1.shapeColor = color(173,120,30);
  hin1.visible = false;

  house2 = new House(500,265,200,200);
  hin2 = createSprite(house2.body.position.x+0.5,house2.body.position.y+40,120,120);
  hin2.shapeColor = color(173,120,30);
  hin2.visible = false;
  bed = createSprite(hin2.x-30,hin2.y+41,30,20);
  bed.addImage("bed",bedImg);
  bed.scale = 0.07;
  bed.visible = false;

  house3 = new House(300,265,200,200);
  hin3 = createSprite(house3.body.position.x+0.5,house3.body.position.y+40,120,120);
  hin3.shapeColor = color(173,120,30);
  hin3.visible = false;



  tree1 = new Tree(200,267,160,270);
  tree2 = new Tree(100,267,160,270);
  tree3 = new Tree(700,267,160,270);


  
  heart = new Hearts(25,25,50,50);
  heart2 = new Hearts(75,25,50,50);
  heart3 = new Hearts(125,25,50,50);

  coin = new Coins(720,15,30,30);
   
  sword = new Sword(lance.x ,340,40,40);
  bow = new Bow(lance.x,340,40,40);



  goblin = createSprite(100,330,30,50);
  goblin.addImage("goblin",goblinImg);
  goblin.scale = 0.7;
  goblin.visible = false;
  //goblin.debug = true;
  goblin.setCollider("rectangle",0,0,30,50);

  goblin2 = createSprite(-100,330,30,50);
  goblin2.addImage("goblin",goblinImg);
  goblin2.scale = 0.7;
  goblin2.visible = false;
  //goblin2.debug = true;
  goblin2.setCollider("rectangle",0,0,30,50);



  villager1= createSprite(150,340,30,50);
  villager1.visible = false;
  villager1.shapeColor="green";

  villager2= createSprite(400,340,30,50);
  villager2.visible = false;
  villager2.shapeColor="green";

  tradeTab = createSprite(400,200,300,100);
  tradeTab.visible = false;
  tradeTab.shapeColor = color(173,120,30);
  bt = createSprite(tradeTab.x-110,tradeTab.y,70,70);
  bt.addImage("bow",bowImg);
  bt.scale = 0.1;
  bt.visible =false;
  ca= createSprite(tradeTab.x,tradeTab.y,70,70);
  ca.addImage("coin",cai);
  ca.scale = 0.03;
  ca.visible =false;
  ca2= createSprite(tradeTab.x+50,tradeTab.y,70,70);
  ca2.addImage("coin2",ca2i);
  ca2.visible =false;
  buyb=createSprite(tradeTab.x+100,tradeTab.y+55,60,20);
  buyb.addImage("button",buybi);
  buyb.visible=false;

  arrowGroup = new Group(); 

}

function draw() {
  background(135,206,235);  
  Engine.update(engine);

  //console.log(lance.y);

  lance.collide(invisground);
  //lance.velocityY =7;
  
  textSize(40);
  fill("white")
  text("Stage: "+stage,340,50);

  textSize(30);
  text("X"+coins,740,25);




  //moving and attacking----------------------------------------
  if(keyDown("LEFT_ARROW")&&wep==="s") {
    //lance.x = lance.x - 5;
    sword.body.position.x = lance.x - 40;
    
  }else if(keyDown("RIGHT_ARROW")&&wep==="s") {
    //lance.x = lance.x + 5;
    sword.body.position.x = lance.x + 40;
  }else {
   sword.body.position.x=100000; 
  }

  if(keyDown("LEFT_ARROW")&&bowget===true&&wep==="b") {
    //lance.x = lance.x - 5;
    bow.body.position.x = lance.x - 40;
  }else if(keyDown("RIGHT_ARROW")&&bowget===true&&wep==="b") {
    //lance.x = lance.x + 5;
    bow.body.position.x = lance.x + 40;
  }else {
   bow.body.position.x=100000; 
  }

  if(keyDown("A")) {
    lance.x = lance.x - 5;
    //sword.body.position.x = lance.x - 40;
    
  }
  if(keyDown("D")) {
    lance.x = lance.x + 5;
    //sword.body.position.x = lance.x + 40;
  }

 if(keyDown("1")){
   wep="s";
 }else if(keyDown("2")){
  wep="b";
 }

 if(bowget===true&&wep==="b"){
   if(keyDown("LEFT_ARROW")){
    if(keyCode=== 70){
     Carrow(-20,lance.x-30,arrowImage);
    }
   }else if(keyDown("RIGHT_ARROW")){
    if(keyCode === 70){
     Carrow(+20,lance.x+30,arrowImage2);
    }
  }
 } 

 if(arrowcooldown>0){
   arrowcooldown--;
 }

 if(keyCode===119&&jc===0){
   if(lance.y>339){
   lance.velocityY = -11;
   jc=30
   }
 }
 if(lance.y<260){
  lance.velocityY = 7;
 }
 if(jc>0){
  jc--;
}




  //display------------------------------------
  lance.depth =lance.depth+1;

  house1.display();
  enh(520,475,0,"Your house",32);
  enh(520,475,"Your house",0,101);
  house2.display();
  enh(520,475,2,"villager1's house",32);
  enh(520,475,"villager1's house",2,101);
  house3.display();
  enh(320,275,2,"villager2's house",32);
  enh(320,275,"villager2's house",2,101);


  tree1.display();
  tree2.display();
  tree3.display();

  sword.display();
  bow.display();
  ground.display();
  heart.display();
  heart2.display();
  heart3.display();
  coin.display();


  

  

 //inside stages---------------------------- 
 if(lance.x===0&&stage<=4){
  stage = stage + 1;
  lance.x = 780;
}else{
  lance.collide(invisleft); 
}
if(lance.x===800&&stage>= -4){
  stage = stage - 1;
  lance.x = 20;
}else{
  lance.collide(invisright); 
}

  if(stage ==="Your house"){
   lance.x = 505;
  }
  if(stage ==="villager1's house"){  
    lance.x = 505;
   }
  if(stage ==="villager2's house"){ 
    lance.x = 305;
   }
  
 

  

//health------------------------------
 if(health === 3){
  heart3.body.position.y = 25;
  heart2.body.position.y = 25;
  heart.body.position.y = 25;
 }
 if(health === 2){
 heart3.body.position.y = 2000;
 heart2.body.position.y = 25;
 heart.body.position.y = 25;
 }
 if(health === 1){
  heart3.body.position.y = 2000;
  heart2.body.position.y = 2000;
  heart.body.position.y = 25;
 }
 if(health === 0){
  heart3.body.position.y = 2000;
  heart2.body.position.y = 2000;
  heart.body.position.y = 2000;
 }
 

 



 
//stage objects----------------------------------------------------
sword.body.position.y =lance.y;
bow.body.position.y =lance.y;

  sta(0,house1,500);
  vis(hin1,"Your house");
  nvis(hin1,"Your house");

  sta(2,house2,500);
  vis(hin2,"villager1's house");
  nvis(hin2,"villager1's house");
  vis(bed,"villager1's house");
  nvis(bed,"villager1's house");

  sta(2,house3,300);
  vis(hin3,"villager2's house");
  nvis(hin3,"villager2's house");



  sta(0,tree1,200,);
  sta(2,tree2,100,);
  sta(2,tree3,700,);
  


  vis(villager1,2,);
  talk(195,100,"Thank you for defeating the goblins",2,villager1);

  vis(villager2,3,);
  talk(445,350,"I am a trader i will trade with you",3,villager2);
  trade(445,350,3,villager2);
  vist(tradeTab,1,Trade);
  vist(bt,1,Trade);
  vist(ca,1,Trade);
  vist(ca2,1,Trade);
  vist(buyb,1,Trade);
  if(mousePressedOver(buyb)&&bowget===false&&coins>=15&&Trade ===1&&bowget===false){
    coins = coins-15;
    bowget=true;
    Trade  = 3;
  }


  vis(goblin,1);
  enemy(goblin,goblinstate,10,1);
  dmage(goblin,1,1);

  vis(goblin2,1);
  enemy(goblin2,goblin2state,10,1);
  dmage(goblin2,1,1);


  drawSprites();
}



//easy functions---------------------------------------------------
function sta(v1,v2,num1){
  if(stage < v1||stage>v1){
    v2.body.position.x = 1000;
  }else if(stage === v1){
    v2.body.position.x = num1;
  }
}
function vis(sprite,Stage){
 if(stage === Stage){
   sprite.visible = true;
 }else if(stage <Stage||stage>Stage){
   sprite.visible = false;
 }
}
function enh(x1,x2,stage1,stage2,key){
  if(lance.x<=x1&&lance.x>=x2&&stage ===stage1){
    //textSize(20);
    //text("Press 'space' to enter",lance.x,lance.y-30);
    if(keyCode === key){
      stage = stage2;
      
    }
  } 
}
function enemy(gob,gobs,coi,stag){
  if(lance.x - gob.x>gob.x-lance.x&&health>0&&gobs === 0&&stage ===stag){
    gob.velocityX = 5;
    if(stage ===stag&&sword.body.position.x===gob.x&&wep==="s"){
     gob.visible =false;
     gob.y = 1000;
     gobs = 1;
     coins = coins+coi;
    }
   }else if(lance.x - gob.x<gob.x-lance.x&&health>0&&gobs === 0&&stage ===stag){
    gob.velocityX = -5;
    if(stage ===stag&&sword.body.position.x===gob.x&&wep==="s"){
     gob.visible =false;
     gob.y = 1000;
     gobs = 1;
     coins = coins+coi;
    }
    }else if(health === 0){
     gob.velocityX = 0;
   }else if(stage != stag){
    gob.velocityX = 0;
   }
}
function dmage(gob,dmg,sta){
  if(lance.isTouching(gob)&&health>0&&stage === sta){
    health = health -dmg;
    if(lance.x - gob.x>gob.x-lance.x&&stage === sta){
    lance.x = lance.x+10;
    }else if(lance.x - gob.x<gob.x-lance.x&&stage === sta){
      lance.x = lance.x-10;    
    }
  }

}
function talk(x,x2,tex,st,vil){
  if(lance.x<=x&&lance.x>=x2&&stage===st){
    textSize(20);
    text("Press 'space' to talk",vil.x-50,vil.y-30);
   
    if(keyCode === 32&&stage===st){
      
      textSize(40);
      fill("green");
      text(tex,100,100);
      
      
      
    }
   }
}
function nvis(sprite,Stage){
  if(stage != Stage){
    sprite.visible = false;
  }
}
function trade(x,x2,st,vil){
  if(lance.x<=x&&lance.x>=x2&&stage===st){
    textSize(20);
    fill("white");
    text("Press 'T' to trade",vil.x-50,vil.y-60);
   
    if(keyCode ===116){
      Trade = 1;
    }
  }else{
    tradeTab.visible = false;
    Trade =0; 
  }
}
function vist(sprite,Stage,tr){
  if(tr === Stage){
    sprite.visible = true;
  }else if(tr <Stage||tr>Stage){
    sprite.visible = false;
  }
}
function Carrow(va,va2,Img) {
  if (arrows>0&&arrowcooldown===0){
   arrow = createSprite (va2,lance.y,50,10)
   arrow.addImage(Img);
   arrow.scale = 2.5;
   arrow.velocityX=va;
   arrows--;
   arrow.lifetime = 60;
   arrowGroup.add(arrow); 
   arrowcooldown = 30;
   
  }
 
 }
 
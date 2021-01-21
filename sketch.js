//Create variables here
var dogg,dog,food,happydog,foodstock;
var database;
var score=20;
var feed,addfood;
var milk;
var lastFed;
var foods=0;
var gameState = "Hungry";
var bedroom;
var washroom;
var garden;

function preload()
{
  //load images here
  doghappy=loadImage("images/happy dog.png");
  dogg=loadImage("images/Dog.png");
  bedroom=loadImage("images/Bed Room.png");
  washroom=loadImage("images/Wash Room.png");
  garden=loadImage("images/Garden.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,330);
  dog.addImage(dogg);
  dog.scale=0.2;

  var foodstock = database.ref('Food');
  foodstock.on("value",readstoke);
  
  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  //feed.mousePressed(scoreMINUS);


  addfood = createButton("add food");
  addfood.position(700,130);
  addfood.mousePressed(addFood);

  milk = new Food(200,200);

  currentTime=hour();
  
  if (currentTime==(lastFed+1)){
    update("Playing");
    milk.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    milk.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    milk.washroom();
  }else{
    update("Hungry");
    milk.display();
  }

}


function draw() {  
  background("darkgreen");
  
  milk.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


if (foods>=50){
stroke("red");
text("warning dargo might get harm of this much food",80,50);
}else if(foods<=50){
text("no harm",80,50);
}

if (lastFed>=0){
  text("Last Feed : "+ lastFed%12 + " PM" ,350,30);

}else if(lastFed===0){
  text("Last Feed : PM" ,350,30);

}else{
  text("Last Feed : "+ lastFed + " AM" ,350,30);

}
 
  if(gameState!=="Hungry"){
    feed.hide();
    addfood.hide();
    dog.remove();
  }else{
    feed.show();
    addfood.show();
    dog.addImage(dogg);
  }

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  drawSprites();
  //add styles here
  text("note: press up  feed button to feed dargo milk",200,20);
  text("reaming food: "+ score,200,200);


}

function readstoke(data){
score=data.val();
  milk.updateFoodStock(score);

}

function writestoke(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  

  database.ref('/').update({
    Food:x
   })

  }

function feedDog(){
   dog.addImage(doghappy);  
   score=score-1;
   foods++;
   milk.updateFoodStock(milk.getFoodStock()-1);
    
   database.ref('/').update({
     Food:food.getFoodStock(),
     FeedTime:hour()
   })


}

function addFood(){
  foods=foods-1
  score++;

  database.ref('/').update({
     Food:score
   });
}

function update(state){
  database.ref('/').update({
    gameState:state
  });

}


class Food {
    constructor(x,y){
    
        this.image = loadImage("images/Milk.png");
        this.foodStock=0;
        this.lastFed;
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);

        if(this.foodStock!== 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    } 
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
    
       getFedTime(lastFed){
         this.lastFed=lastFed;
       }
    
       deductFood(){
         if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
         }
        }
    
        getFoodStock(){
          return this.foodStock;
        }

        washroom(){
            background(washroom,200,200);

        }
        
        bedroom(){
            background(bedroom,200,200);

        }
        garden(){
            background(garden,200,200);

        }
  }

  
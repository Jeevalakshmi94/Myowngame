    var boundry1,boundry2,boundry3,boundry4;
    var score = 0;
    var life = 3;
    var gameState = "LEVEL1"
    var snakeA = []
    function preload(){
        //foodImg = loadImage("food.png")
    }

    function setup(){
        createCanvas(windowWidth-50,windowHeight-50)


        boundry1 = createSprite(width/2,height-5,width,10)
        boundry1.shapeColor = "black"
        boundry2 = createSprite(width/2,5,width,10)
        boundry2.shapeColor = "black"
        boundry3 = createSprite(width-5,height/2,10,height)
        boundry3.shapeColor = "black"
        boundry4 = createSprite(5,height/2,10,height)
        boundry4.shapeColor = "black"
        
        
        innerBoundry1 = createSprite(width/2,height-200,width/2,10)
        innerBoundry1.shapeColor = "black"
        innerBoundry2 = createSprite(width/2,200,width/2,10)
        innerBoundry2.shapeColor = "black"
        innerBoundry3 = createSprite(width-200,height/2,10,height/2)
        innerBoundry3.shapeColor = "black"
        innerBoundry4 = createSprite(200,height/2,10,height/2)
        innerBoundry4.shapeColor = "black"
        innerBoundry1.visible = false
        innerBoundry2.visible = false
        innerBoundry3.visible = false
        innerBoundry4.visible = false

        innerB1 = createSprite(width/2,height-200,width/2+160,10)
        innerB1.shapeColor = "black"
        innerB2 = createSprite(width/2,200,width/2+160,10)
        innerB2.shapeColor = "black"
        innerB3 = createSprite(width-200,height/2,10,height/2+100)
        innerB3.shapeColor = "black"
        innerB4 = createSprite(200,height/2-50,10,height/2)
        innerB4.shapeColor = "black"
        innerB1.visible = false
        innerB2.visible = false
        innerB3.visible = false
        innerB4.visible = false


        snake = createSprite(width/2,height/2,25,25)
        snake.shapeColor = rgb(50,80,66)


        foodG = new Group()
        BfoodG = new Group()
        lifeG = new Group()
    }

    function draw(){
        background("lightGreen")

        textSize(30)
        fill("black")
        text("Score:) "+score,30,50)
        text("Life:) "+life,30,90)

        spawnFood();
        spawnBFood();


        if(life <= 1){
            spawnLife();
        }
        

        if(keyDown(LEFT_ARROW)){
            snake.velocityX = -(5+Math.round(score/5))
            snake.velocityY = 0
        }
        if(keyDown(RIGHT_ARROW)){
            snake.velocityX = (5+Math.round(score/5))
            snake.velocityY = 0
        }
        if(keyDown(UP_ARROW)){
            snake.velocityX = 0
            snake.velocityY = -(5+Math.round(score/5))
            
        }
        if(keyDown(DOWN_ARROW)){
            snake.velocityX = 0
            snake.velocityY = (5+Math.round(score/5))
            
        }

        if(foodG.isTouching(snake)){
            snakeA.push(snake)
            updateSnake()
            foodG.destroyEach()
            score = score+1;
        }
        if(BfoodG.isTouching(snake)){
            BfoodG.destroyEach()
            score = score-2;
        }
        if(lifeG.isTouching(snake)){
            lifeG.destroyEach()
            life = life+1;
        }
         

        if(boundry1.isTouching(snake) || 
        boundry2.isTouching(snake) ||
        boundry3.isTouching(snake) || 
        boundry4.isTouching(snake)
        ){
            snake.setVelocity(0,0)
            snake.x = width/2
            snake.y = height/2
            life = life-1
        }

        if(gameState === "LEVEL1"){
        if(innerBoundry1.isTouching(snake) || 
        innerBoundry2.isTouching(snake) ||
        innerBoundry3.isTouching(snake) || 
        innerBoundry4.isTouching(snake)){
            snake.setVelocity(0,0)
            snake.x = width/2
            snake.y = height/2
            life = life-1
        }
            /*innerB1.destroy()
            innerB2.destroy()
            innerB3.destroy()
            innerB4.destroy()*/
            innerBoundry1.visible = true
            innerBoundry2.visible = true
            innerBoundry3.visible = true
            innerBoundry4.visible = true
        }

        
        
        if(score === 50){
            gameState = "LEVEL2"
        }

        if(gameState === "LEVEL2"){
        if(innerB1.isTouching(snake) || 
        innerB2.isTouching(snake) ||
        innerB3.isTouching(snake) ||
        innerB4.isTouching(snake)){
            snake.setVelocity(0,0)
            snake.x = width/2
            snake.y = height/2
            life = life-1
        }
            innerB1.visible = true
            innerB2.visible = true
            innerB3.visible = true
            innerB4.visible = true
            /*innerBoundry1.destroy() 
            innerBoundry2.destroy()
            innerBoundry3.destroy()
            innerBoundry4.destroy()*/
        }

        
        if(life === 0){
            gameState = "END"
        }
        if(gameState === "END"){
            foodG.destroyEach();
            BfoodG.destroyEach();
            lifeG.destroyEach();
            snake.visible = false
            textSize(50)
            fill("white")
            text("GAME OVER!",width/2-150,height/2)
            textSize(40)
            text("Press 'R' to reset..",width/2-150,height/2+50)
        }
        if(keyDown("R")){
          reset()  
        }

        drawSprites();
    }

    function spawnFood(){
        if(frameCount%120===0){
            var food = createSprite(Math.round(random(30,width-30)),Math.round(random(30,height-30)),20,20) 
            //food.addImage("food",foodImg)
            //food.scale = 0.35
            food.shapeColor = "white"
            food.lifetime = 150
            if(food.isTouching(innerBoundry1)){
                food.y = food.y-40
            }
            if(food.isTouching(innerBoundry2)){
                food.y = food.y-40
            }
            if(food.isTouching(innerBoundry3)){
                food.x = food.x-40
            }
            if(food.isTouching(innerBoundry4)){
                food.x = food.x-40
            }
            foodG.add(food)
        }
    }

    function spawnBFood(){
        if(frameCount%350===0){
            var Bfood = createSprite(Math.round(random(30,width-30)),Math.round(random(30,height-30)),15,15) 
            //food.addImage("food",foodImg)
            //food.scale = 0.35
            Bfood.shapeColor = "purple"
            Bfood.lifetime = 250
            if(Bfood.isTouching(innerBoundry1)){
                Bfood.y = Bfood.y-40
            }
            if(Bfood.isTouching(innerBoundry2)){
                Bfood.y = Bfood.y-40
            }
            if(Bfood.isTouching(innerBoundry3)){
                Bfood.x = Bfood.x-40
            }
            if(Bfood.isTouching(innerBoundry4)){
                Bfood.x = Bfood.x-40
            }
            BfoodG.add(Bfood)
        }
    }

    function spawnLife(){
        if(frameCount%250===0){
            var life = createSprite(Math.round(random(30,width-30)),Math.round(random(30,height-30)),15,15) 
            //food.addImage("food",foodImg)
            //food.scale = 0.35
            life.shapeColor = "red"
            //Bfood.lifetime = 0
            if(life.isTouching(innerBoundry1)){
                life.y = life.y-40
            }
            if(life.isTouching(innerBoundry2)){
                life.y = life.y-40
            }
            if(life.isTouching(innerBoundry3)){
                life.x = life.x-40
            }
            if(life.isTouching(innerBoundry4)){
                life.x = life.x-40
            }
            lifeG.add(life)
        }
    }

function reset(){
    gameState = "LEVEL1";
    snake.visible = true;
    score = 0;
    life = 3;

}

function updateSnake(){
    for(var i = 0;i<=snakeA.length-1;i++){
        snakeA[i] = snakeA[i+1]
    }
    if(score>=1){
        snakeA[score-1] = createSprite(x,y,25,25)
    }
    x = snake.x+25
    y = snake.y+25
}
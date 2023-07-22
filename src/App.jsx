import { useEffect, useState } from 'react'
import platform from './img/platform.png'
import hills from './img/hills.png'
import background from './img/background.png'
import platformSmallTall from './img/platformSmallTall.png'

import spriteRunLeft from './img/spriteRunLeft.png'
import spriteRunRight from './img/spriteRunRight.png'
import spriteStandLeft from './img/spriteStandLeft.png'
import spriteStandRight from './img/spriteStandRight.png'

import winScreen from './img/winScreen.png'


function App() {

    console.log(background);
    
    
    useEffect(()=>{
    const canvas = document.querySelector('canvas');
    console.log(canvas);
    const c  = canvas.getContext('2d')
    canvas.width = 1024//screen.width 
    canvas.height = 570

    const gravity = 0.5;

    class Player {
    constructor(){
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = {
            x : 0,
            y : 0
        }
        this.height = 150
        this.width = 66
        this.speed = 10
        this.image = createImg(spriteStandRight)
        this.frame = 0  
        this.sprite = {
            stand : {
                right : createImg(spriteStandRight),
                left : createImg(spriteStandLeft),
                cropWidth : 177,
                width : 66,
            },
            run :{
                right : createImg(spriteRunRight),
                left : createImg(spriteRunLeft),
                cropWidth : 341,
                width : 127.875
            }
        }
        this.currentSprite = this.sprite.stand.right
        this.currentCropWidth = this.sprite.stand.cropWidth
        this.currentWidth = this.sprite.stand.width
    }

    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.currentWidth, 
            this.height)
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y , this.width , this.height);
    }

    update(){
        this.frame++

        if(this.frame >= 59 && 
          (this.currentSprite === this.sprite.stand.right || this.currentSprite === this.sprite.stand.left)) this.frame = 0;
        else if(this.frame >= 29 && 
          (this.currentSprite === this.sprite.run.right || this.currentSprite === this.sprite.run.left)) this.frame = 0;


        this.draw();
        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
        //else this.velocity.y = 0
    }
}

    class Platform {
        constructor({x ,y , image}){
            this.position = {
                x,
                y
            }

            this.width = image.width
            this.height = image.height
            this.image = image
        }

        draw(){
            c.drawImage(this.image,this.position.x,this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x , this.position.y , this.width , this.height)
        }
    }

    class GenericObject {
        constructor({x ,y , image}){
            this.position = {
                x,
                y
            }

            this.width = image.width
            this.height = image.height
            this.image = image
        }

        draw(){
            c.drawImage(this.image,this.position.x,this.position.y)
            // c.fillStyle = 'blue'
            // c.fillRect(this.position.x , this.position.y , this.width , this.height)
        }
    }

    class WinObject {
        constructor({x ,y }){
            this.position = {
                x,
                y
            }

            this.width = 300
            this.height = 200
            // this.image = image
        }

        draw(){
            //c.drawImage(this.image,this.position.x,this.position.y)
            c.fillStyle = 'blue'
            c.fillRect(this.position.x , this.position.y , this.width , this.height)
        }
    }

    function createImg(imgSrc){
        const img = new Image()
        img.src = imgSrc;
        return img
    }
    

    let player = new Player();
    let platforms = [];
    let genericObjets = []
    let currenKey = ''


    function init(){
        player = new Player();
        // platforms = [
        // new Platform({x : createImg(platform).width*4 + createImg(platformSmallTall).width +300-2, y : 250 , image : createImg(platformSmallTall)}),
        // new Platform({x : -1, y : 450 , image : createImg(platform)}),
        // new Platform({x : createImg(platform).width -2 , y : 450 , image : createImg(platform)}),
        // new Platform({x : createImg(platform).width*2 +100, y : 450 , image : createImg(platform)}),
        // new Platform({x : createImg(platform).width*3 +300, y : 450 , image : createImg(platform)}),
        // new Platform({x : createImg(platform).width*4 +300-2, y : 450 , image : createImg(platform)}),
        // new Platform({x : createImg(platform).width*5 +1000-2, y : 450 , image : createImg(platform)}),
        // ];
        genericObjets = [
        new GenericObject({x : -1 , y : -1 , image : createImg(background)}),
        new GenericObject({x : -1 , y : -1 , image : createImg(hills)})
        ]

        const platformWidth = createImg(platform).width;
        const platformSmallWidth = createImg(platformSmallTall).width;

        platforms = [
        // First type of platform (platformSmall)
        new Platform({ x: platformWidth * 4 + platformSmallWidth + 300 - 4, y: 250, image: createImg(platformSmallTall), width: platformSmallWidth }),
        new Platform({ x: -1, y: 450, image: createImg(platform), width: platformWidth }),
        new Platform({ x: platformWidth - 2, y: 450, image: createImg(platform), width: platformWidth }),
        new Platform({ x: platformWidth * 2 + 100, y: 450, image: createImg(platform), width: platformWidth }),
        new Platform({ x: platformWidth * 3 + 300, y: 450, image: createImg(platform), width: platformWidth }),
        new Platform({ x: platformWidth * 4 + 300 - 2, y: 450, image: createImg(platform), width: platformWidth }),
        new Platform({ x: platformWidth * 5 + 1000 - 2, y: 450, image: createImg(platform), width: platformWidth }),

        // Second type of platform (platform)
        new Platform({ x: platformWidth * 6 + platformSmallWidth + 1000 - 2, y: 450, image: createImg(platformSmallTall), width: platformWidth }),
        new Platform({ x: platformWidth * 7 + platformSmallWidth + 1000 - 2, y: 350, image: createImg(platformSmallTall), width: platformWidth }),
        new Platform({ x: platformWidth * 8 + platformSmallWidth + 1000 - 2, y: 250, image: createImg(platformSmallTall), width: platformWidth }),
        new Platform({ x: platformWidth * 9 + platformSmallWidth + 1000 - 2, y: 350, image: createImg(platformSmallTall), width: platformWidth }),
        new Platform({ x: platformWidth * 27 + platformSmallWidth + 1000 - 2, y: 250, image: createImg(platformSmallTall), width: platformWidth }),

        new Platform({ x: platformWidth * 27 + platformSmallWidth + 1000 - 2, y: 100, image: createImg(winScreen), width: platformWidth })

        ];
        for (let i = 10; i <= 26; i++) {
            platforms.push(new Platform({ x: platformWidth * i + platformSmallWidth + 1000 - 2, y: 450, image: createImg(platform), width: platformWidth }));
        }

        scrollOffset = 0 ;
    }

    const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    },
    up : {
        pressed : false
    },
    down : {
        pressed : false
    }

} 

player.draw();
player.update();

let scrollOffset = 0 ;
const maxOffset = createImg(platform).width * 27 + createImg(platformSmallTall).width*0 + 1000 - 2;
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height);
    //c.clearRect(0,0,canvas.width,canvas.height);
    
    genericObjets.forEach(go => {
        go.draw()
    })
    platforms.forEach(platform => {
        platform.draw()
    })
    
    player.update();
    if(
        (keys.right.pressed && player.position.x < 400)
    || (keys.right.pressed && scrollOffset === maxOffset-200 && player.position.x <= maxOffset-200)){
        player.velocity.x = player.speed;
    }else if(
        (keys.left.pressed && player.position.x > 100)
    ||  (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)){
        player.velocity.x = -player.speed;
    }else{
        player.velocity.x = 0;

        if(keys.right.pressed && scrollOffset <= maxOffset-200){
            if(scrollOffset <= maxOffset-700){
                genericObjets.forEach(go => {
                go.position.x -=player.speed*0.66
            })
            }
            
            scrollOffset +=player.speed;
            platforms.forEach(platform => {
                platform.position.x -=player.speed
            })            
        }
        else if(keys.left.pressed && scrollOffset > 0){

            genericObjets.forEach(go => {
                go.position.x +=player.speed*0.66
            })
            scrollOffset -=player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            })
            
            
        }
    }

    //colission
    platforms.forEach(platform => {
       if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0;
    }
    })

    //sprite switch
    if(
        keys.right.pressed &&
        currenKey ===  'right' && 
        player.currentSprite !== player.sprite.run.right){
        player.currentSprite = player.sprite.run.right
        player.frame = 1 
        player.currentSprite = player.sprite.run.right   
        player.currentCropWidth = player.sprite.run.cropWidth
        player.currentWidth = player.sprite.run.width  
    }
    else if (
        keys.left.pressed &&
        currenKey ===  'left' && 
        player.currentSprite !== player.sprite.run.left){
        player.currentSprite = player.sprite.run.left   
        player.currentCropWidth = player.sprite.run.cropWidth
        player.currentWidth = player.sprite.run.width
    }
    else if (
        !keys.left.pressed &&
        currenKey ===  'left' && 
        player.currentSprite !== player.sprite.stand.left){
        player.currentSprite = player.sprite.stand.left   
        player.currentCropWidth = player.sprite.stand.cropWidth
        player.currentWidth = player.sprite.stand.width
    }
    else if (
        !keys.right.pressed &&
        currenKey ===  'right' && 
        player.currentSprite !== player.sprite.stand.right){
        player.currentSprite = player.sprite.stand.right   
        player.currentCropWidth = player.sprite.stand.cropWidth
        player.currentWidth = player.sprite.stand.width
    }
    //win
    if(scrollOffset > maxOffset){
        console.log('You win')
    }

    //death
    if(player.position.y >= canvas.height){
        init()
    }
    
}

init()
animate()
const win = new WinObject({x : createImg(platform).width * 27 + createImg(platformSmallTall) + 1000 - 2 , y : 200})
win.draw()

window.addEventListener('keydown' , ({ keyCode }) =>{
    console.log(keyCode);
    switch(keyCode){
        case 65:{
            console.log("left")
            keys.left.pressed = true; 
            currenKey = 'left'
            break
        }
        case 83:{
            console.log("down")
            player.velocity.y = 200; 
            break
        }
        case 68:{
            console.log("right")
            keys.right.pressed = true;    
            currenKey = 'right'
            break
        }
        case 87:{
            console.log("up")
            player.velocity.y -= 15; 
            break
        }
    }
})

window.addEventListener('keyup' , ({ keyCode }) =>{
    console.log(keyCode);
    switch(keyCode){
        case 65:{
            console.log("left")
            keys.left.pressed = false;
            player.currentSprite = player.sprite.stand.left   
            player.currentCropWidth = player.sprite.stand.cropWidth
            player.currentWidth = player.sprite.stand.width
            break
        }
        case 83:{
            console.log("down")
            break
        }
        case 68:{
            console.log("right")
            keys.right.pressed = false;
            player.currentSprite = player.sprite.stand.right   
            player.currentCropWidth = player.sprite.stand.cropWidth
            player.currentWidth = player.sprite.stand.width  
            break
        }
        case 87:{
            console.log("up")
            break
        }
    }
})
  },[])
  

  return (
    <>
    <canvas></canvas>  
    </>
  )
}

export default App

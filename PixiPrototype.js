import {Application, Container, Graphics, Text} from './node_modules/pixi.js/dist/pixi.mjs';
(async () =>{
    const app = new Application();
    await app.init({
        background:'#1099bb',
        resizeTo:window
    });
    app.canvas.style.position='absolute';
    document.body.appendChild(app.canvas);
    
    
    
    /*
    * Main menu scene
    *
    *
    */
    const titleScene = new Container();
    app.stage.addChild(titleScene);
    let titleText = new Text("Fishing game title",{
        fontFamily: "Arial",
        fontSize: 50,
        align: "center",
        fill: 0xffffff
    });
    titleText.anchor.set(0.5);
    titleText.x = window.innerWidth/2;
    titleText.y=150;
    titleScene.addChild(titleText);

    let startButton = new Graphics();
    startButton.roundRect(0, 0, 200, 60);
    startButton.fill(0x0011ff);
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.x = window.innerWidth /2 -100;
    startButton.y = 300;

    let startText = new Text("Start",{
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
    })
    startText.anchor.set(0.5);
    startText.x = 100;
    startText.y = 30;
    startButton.addChild(startText);
    titleScene.addChild(startButton);
    
    let exitButton = new Graphics();
    exitButton.roundRect(0, 0, 200, 60);
    exitButton.fill(0x466494);
    exitButton.x = window.innerWidth /2 -100;
    exitButton.y = 400;
    exitButton.interactive = true;
    exitButton.buttonMode = true;

    let exitText = new Text("Exit",{
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff
    });
    exitText.anchor.set(0.5);
    exitText.x=100;
    exitText.y=30;
    exitButton.addChild(exitText);
    titleScene.addChild(exitButton);
    
    
    
    /*
    *   Game Scene
    *   TODO Replace the Graphics object with the Kronii sprite
    *   once we have it
    */
    const gameScene = new Container();
    gameScene.visible = false;
    app.stage.addChild(gameScene);
    
    let kroniiBody = new Graphics();
    kroniiBody.rect(0, 0, 80, 160);
    kroniiBody.fill(0x0000ff);
    kroniiBody.x = 80;
    kroniiBody.y = 50;
    let kroText = new Text("This is supposed to be kronii",{
        fontFamily: "Arial",
        fontSize: 20,
        fill: 0xffffff,
        align: "center"
    });
    kroText.anchor.set(0.5)
    kroText.x = 40;
    kroText.y = 2;
    kroniiBody.addChild(kroText);
    gameScene.addChild(kroniiBody);
    
    let gameText = new Text("You are now on game scene", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        align: "center"  
    });
    gameText.anchor.set(0.5);
    gameText.x = window.innerWidth/2;
    gameText.y = window.innerHeight/2;
    gameScene.addChild(gameText);


    /*
    *   GAME LOOP
    *
    *
    */
    let elapsed=0.0;
    app.ticker.add((gameloop)=>{
        elapsed+= gameloop.deltaTime;
        if(gameScene.visible){
            movePlayer(gameloop)
        }
    });

    let keys = {};
    window.addEventListener("keydown", (e)=>{
        keys[e.key]=true;
    });
    window.addEventListener("keyup", (e)=>{
        keys[e.key]=false;
    });




    //functions
    function movePlayer(delta){
        /* TODO maybe move the background instead of the player
        and keep the player on the middle of the screen at all
        times... */
        if(keys["W"]|| keys["w"]) kroniiBody.y -= 5;
        if(keys["D"]|| keys["d"]) kroniiBody.x += 5;
        if(keys["A"]|| keys["a"]) kroniiBody.x -= 5;
        if(keys["S"]|| keys["s"]) kroniiBody.y += 5;
    }


    function changeScene(scene){
        titleScene.visible = false;
        gameScene.visible=false;
        scene.visible = true;
    }

    startButton.on("pointerdown", ()=>{
        changeScene(gameScene);
    });
    exitButton.on("pointerdown",()=>{
        // TODO exit the game instead of showing this alert
        alert("Exiting the game... (function not added yet)");
    })
})();
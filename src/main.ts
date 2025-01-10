import { Application, Container, Graphics, Text } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

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
  titleText.x = app.screen.width /2;
  titleText.y=150;
  titleScene.addChild(titleText);

  let startButton = new Graphics();
  startButton.roundRect(0, 0, 200, 60);
  startButton.fill(0x0011ff);
  startButton.interactive = true;
  // startButton.buttonMode = true;
  startButton.x = app.screen.width /2 -100;
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
  exitButton.x =app.screen.width /2 -100;
  exitButton.y = 400;
  exitButton.interactive = true;
  // exitButton.buttonMode = true;

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
  
  let gameBackground = new Container(); //TODO add background image

  let fishingSpot = new Graphics();
  fishingSpot.circle(0, 0, 30);
  fishingSpot.fill(0x000000);
  fishingSpot.x = 2000;
  fishingSpot.y = 2000;
  gameBackground.addChild(fishingSpot);
  gameScene.addChild(gameBackground);
  let positionText = new Text("Pos - X: 0, Y: 0",{
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xffffff,
      align: "center"
  });
  positionText.anchor.set(0.5)
  positionText.x = 25;
  positionText.y = 25;
  gameScene.addChild(positionText);


  let kroniiBody = new Graphics();
  kroniiBody.rect(0, 0, 80, 160);
  kroniiBody.fill(0x0000ff);
  kroniiBody.x = (app.screen.width/2)-kroniiBody.height/2;
  kroniiBody.y = (app.screen.height/2)-kroniiBody.width/2;
  gameScene.addChild(kroniiBody);
  

  /*
  *   GAME LOOP
  *
  *
  */
  let elapsed=0.0;
  app.ticker.add((gameloop: any)=>{
      elapsed+= gameloop.deltaTime;
      if(gameScene.visible){
          movePlayer(gameloop)
      }
      positionText.text="Pos - X:"+gameBackground.x+", Y: "+gameBackground.y;
  });

  let keys: Record<string, Boolean> = {};
  window.addEventListener("keydown", (e)=>{
      keys[e.key]=true;
  });
  window.addEventListener("keyup", (e)=>{
      keys[e.key]=false;
  });




  //functions
  function movePlayer(delta: any){
      /* TODO maybe move the background instead of the player
      and keep the player on the middle of the screen at all
      times... */
      /*
      if(keys["W"]|| keys["w"]) kroniiBody.y -= 5;
      if(keys["D"]|| keys["d"]) kroniiBody.x += 5;
      if(keys["A"]|| keys["a"]) kroniiBody.x -= 5;
      if(keys["S"]|| keys["s"]) kroniiBody.y += 5;*/
      //background movement instead of player sprite movement test
      if(keys["W"]|| keys["w"])gameBackground.y += 5;
      if(keys["D"]|| keys["d"])gameBackground.x -= 5;
      if(keys["A"]|| keys["a"])gameBackground.x += 5;
      if(keys["S"]|| keys["s"])gameBackground.y -= 5;
  }


  function changeScene(scene: any){
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
  });
})();

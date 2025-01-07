import { Application, Container, Graphics, Text } from "pixi.js";

const setupMainMenu = (app: any, titleScene: any, changeScene: (scene: any) => void, gameScene: any) => {
  app.stage.addChild(titleScene);
  const titleText = new Text({
    text: "Fishing game title", 
    style: {
      fontFamily: "Arial",
      fontSize: 50,
      align: "center",
      fill: 0xffffff
    },
  });
  titleText.anchor.set(0.5);
  titleText.x = window.innerWidth / 2;
  titleText.y = 150;
  titleScene.addChild(titleText);

  const startButton = new Graphics();
  startButton.roundRect(0, 0, 200, 60);
  startButton.fill(0x0011ff);
  startButton.interactive = true;
  // startButton.buttonMode = true;
  startButton.x = window.innerWidth / 2 - 100;
  startButton.y = 300;

  const startText = new Text("Start", {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff,
  });
  startText.anchor.set(0.5);
  startText.x = 100;
  startText.y = 30;
  startButton.addChild(startText);
  titleScene.addChild(startButton);

  const exitButton = new Graphics();
  exitButton.roundRect(0, 0, 200, 60);
  exitButton.fill(0x466494);
  exitButton.x = window.innerWidth / 2 - 100;
  exitButton.y = 400;
  exitButton.interactive = true;
  // exitButton.buttonMode = true;
  const exitText = new Text("Exit", {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff
  });
  exitText.anchor.set(0.5);
  exitText.x = 100;
  exitText.y = 30;
  exitButton.addChild(exitText);
  titleScene.addChild(exitButton);

  startButton.on("pointerdown", () => {
    changeScene(gameScene);
  });
  exitButton.on("pointerdown", () => {
    // TODO exit the game instead of showing this alert
    alert("Exiting the game... (function not added yet)");
  });
};

const setupGameScene = (gameScene: any, app: any) => {
  /*
  *   TODO Replace the Graphics object with the Kronii sprite
  *   once we have it
  */
  gameScene.visible = false;
  app.stage.addChild(gameScene);

  const kroniiBody = new Graphics();
  kroniiBody.rect(0, 0, 80, 160);
  kroniiBody.fill(0x0000ff);
  kroniiBody.x = 80;
  kroniiBody.y = 50;
  const kroText = new Text("This is supposed to be kronii", {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0xffffff,
    align: "center"
  });
  kroText.anchor.set(0.5);
  kroText.x = 40;
  kroText.y = 2;
  kroniiBody.addChild(kroText);
  gameScene.addChild(kroniiBody);

  const gameText = new Text("You are now on game scene", {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff,
    align: "center"
  });
  gameText.anchor.set(0.5);
  gameText.x = window.innerWidth / 2;
  gameText.y = window.innerHeight / 2;
  gameScene.addChild(gameText);


  /*
  *   GAME LOOP
  *
  *
  */
  const movePlayer = (delta: any) => {
    /* TODO maybe move the background instead of the player
    and keep the player on the middle of the screen at all
    times... */
    if (keys["W"] || keys["w"]) kroniiBody.y -= 5;
    if (keys["D"] || keys["d"]) kroniiBody.x += 5;
    if (keys["A"] || keys["a"]) kroniiBody.x -= 5;
    if (keys["S"] || keys["s"]) kroniiBody.y += 5;
  };

  let elapsed = 0.0;
  app.ticker.add((gameloop: any) => {
    elapsed += gameloop.deltaTime;
    if (gameScene.visible) {
      movePlayer(gameloop);
    }
  });

  const keys: Record<string, Boolean> = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
};

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const titleScene = new Container();
  const gameScene = new Container();

  const changeScene = (scene: any) => {
    titleScene.visible = false;
    gameScene.visible = false;
    scene.visible = true;
  };

  setupMainMenu(app, titleScene, changeScene, gameScene);
  
  setupGameScene(gameScene, app);
})();

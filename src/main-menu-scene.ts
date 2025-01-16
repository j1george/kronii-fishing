import { Application, Container, Graphics, Text } from "pixi.js";

/*
* Main menu scene
*
*
*/
export const setupMainMenuScene = (app: Application, gameScene: Container) => {
  const titleScene = new Container();
  app.stage.addChild(titleScene);

  const titleText = new Text({
    text: 'Fishing game title',
    style: {
      fontFamily: "Arial",
      fontSize: 50,
      align: "center",
      fill: 0xffffff,
    },
  });
  titleText.anchor.set(0.5);
  titleText.x = app.screen.width / 2;
  titleText.y = 150;
  titleScene.addChild(titleText);

  const startButton = new Graphics();
  startButton.roundRect(0, 0, 200, 60);
  startButton.fill(0x0011ff);
  startButton.interactive = true;
  startButton.x = app.screen.width / 2 - 100;
  startButton.y = 300;

  const startText = new Text({
    text: 'Start',
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
    },
  });
  startText.anchor.set(0.5);
  startText.x = 100;
  startText.y = 30;
  startButton.addChild(startText);
  titleScene.addChild(startButton);

  const exitButton = new Graphics();
  exitButton.roundRect(0, 0, 200, 60);
  exitButton.fill(0x466494);
  exitButton.x = app.screen.width / 2 - 100;
  exitButton.y = 400;
  exitButton.interactive = true;

  const exitText = new Text({
    text: 'Exit',
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
    },
  });
  exitText.anchor.set(0.5);
  exitText.x = 100;
  exitText.y = 30;
  exitButton.addChild(exitText);
  titleScene.addChild(exitButton);

  const changeScene = (scene: Container) => {
    titleScene.visible = false;
    gameScene.visible = false;
    scene.visible = true;
  };

  startButton.on("pointerdown", () => {
    changeScene(gameScene);
  });
  exitButton.on("pointerdown", () => {
    // TODO exit the game instead of showing this alert
    alert("Exiting the game... (function not added yet)");
  });
};

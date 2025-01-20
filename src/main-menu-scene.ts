import { Application, Container, FillInput, Graphics, Text } from "pixi.js";

/*
* Main menu scene
*
*
*/
export const setupMainMenuScene = (params: {
  app: Application,
  titleScene: Container,
  goToGameScene: () => void,
  goToFishDataScene: () => void,
}) => {
  const { app, titleScene, goToGameScene, goToFishDataScene } = params;
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

  addButtons({ app, titleScene, goToGameScene, goToFishDataScene });
};

const addButtons = (params : {
  app: Application,
  titleScene: Container,
  goToGameScene: () => void,
  goToFishDataScene: () => void,
}) => {
  const { app, titleScene, goToGameScene, goToFishDataScene } = params;

  const startButton = createButton({
    app,
    label: 'Start',
    buttonColor: 0x0011ff,
    index: titleScene.children.length,
    onClick: () => goToGameScene,
  });
  titleScene.addChild(startButton);

  const settingsButton = createButton({
    app,
    label: 'Settings',
    buttonColor: 0x466494,
    index: titleScene.children.length,
    onClick: goToFishDataScene,
  });
  titleScene.addChild(settingsButton);
  
  const exitButton = createButton({
    app,
    label: 'Exit',
    buttonColor: 0x466494,
    index: titleScene.children.length,
    onClick: () => {
      // TODO exit the game instead of showing this alert
      alert("Exiting the game... (function not added yet)");
    },
  });
  titleScene.addChild(exitButton);
}

function createButton(params: {
  app: Application,
  label: string,
  onClick: () => void,
  buttonColor: FillInput,
  index: number,
}) {
  const { app, label, onClick, buttonColor, index } = params;

  const button = new Graphics();
  button.roundRect(0, 0, 200, 60);
  button.fill(buttonColor);
  button.interactive = true;
  button.x = app.screen.width / 2 - 100;
  button.y = (index * 100) + 300;

  const text = new Text({
    text: label,
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
    },
  });
  text.anchor.set(0.5);
  text.x = 100;
  text.y = 30;

  // todo: this is deprecated
  button.addChild(text);

  button.on("pointerdown", onClick);

  return button;
}

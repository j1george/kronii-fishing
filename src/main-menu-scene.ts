import { Application, Container, Text } from "pixi.js";
import { createButton, notYetImplemented } from "./utils";

/*
* Main menu scene
*
*
*/
export const setupMainMenuScene = (params: {
  app: Application,
  titleScene: Container,
  goToGameScene: () => void,
  goToSettingsScene: () => void,
}) => {
  const { app, titleScene, goToGameScene, goToSettingsScene } = params;
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

  addButtons({ app, titleScene, goToGameScene, goToSettingsScene });
};

const addButtons = (params : {
  app: Application,
  titleScene: Container,
  goToGameScene: () => void,
  goToSettingsScene: () => void,
}) => {
  const { app, titleScene, goToGameScene, goToSettingsScene } = params;

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
    onClick: goToSettingsScene,
  });
  titleScene.addChild(settingsButton);
  
  const cheatButton = createButton({
    app,
    label: 'Cheat',
    buttonColor: 0x466494,
    index: titleScene.children.length,
    onClick: () => { 
      // todo
      notYetImplemented() 
    },
  });
  titleScene.addChild(cheatButton);
  
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
};

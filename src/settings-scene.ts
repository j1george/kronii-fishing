import { Application, Container, Text } from "pixi.js";
import { createButton } from "./utils";

/*
* Settings scene
*/
export const setupSettingsScene = (params: {
  app: Application,
  settingsScene: Container,
  goToFishDataScene: () => void,
}) => {
  const { app, settingsScene, goToFishDataScene } = params;
  const titleText = new Text({
    text: 'Settings',
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
  settingsScene.addChild(titleText);

  addButtons({ app, settingsScene, goToFishDataScene });
};

const addButtons = (params : {
  app: Application,
  settingsScene: Container,
  goToFishDataScene: () => void,
}) => {
  const { app, settingsScene, goToFishDataScene } = params;

  const fishDataButton = createButton({
    app,
    label: 'Fish Data',
    buttonColor: 0x466494,
    index: settingsScene.children.length,
    onClick: goToFishDataScene,
  });
  settingsScene.addChild(fishDataButton);
};

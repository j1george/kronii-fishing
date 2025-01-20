import { Application, Container } from "pixi.js";
import { setupMainMenuScene } from "./main-menu-scene";
import { setupGameScene } from "./game-scene";
import { setupFishDataScene } from "./fish-data-scene";
import { setupSettingsScene } from "./settings-scene";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  const titleScene = new Container();
  const gameScene = new Container();
  const fishDataScene = new Container();
  const settingsScene = new Container();

  const changeScene = (from: Container, to: Container) => {
    app.stage.removeChild(from);
    app.stage.addChild(to);
  };

  app.stage.addChild(titleScene);

  setupMainMenuScene({
    app, 
    titleScene,
    goToGameScene: () => {
      setupGameScene(app, gameScene);
      changeScene(titleScene, gameScene);
    },
    goToSettingsScene: () => { 
      setupSettingsScene({
        app, 
        settingsScene,
        goToFishDataScene: () => {
          setupFishDataScene(fishDataScene);
          changeScene(settingsScene, fishDataScene);
        },
      });
      changeScene(titleScene, settingsScene) 
    },
  });
})();

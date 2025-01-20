import { Application, Container } from "pixi.js";
import { setupMainMenuScene } from "./main-menu-scene";
import { setupGameScene } from "./game-scene";
import { setupSettingsScene } from "./settings-scene";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  const titleSceneContainer = new Container();
  const gameSceneContainer = new Container();
  const settingsSceneContainer = new Container();

  const changeScene = (from: Container, to: Container) => {
    app.stage.removeChild(from);
    app.stage.addChild(to);
  };

  app.stage.addChild(titleSceneContainer);

  setupMainMenuScene({
    app, 
    container: titleSceneContainer,
    goToGameScene: () => {
      setupGameScene(app, gameSceneContainer);
      changeScene(titleSceneContainer, gameSceneContainer);
    },
    goToSettingsScene: () => { 
      setupSettingsScene({
        app, 
        container: settingsSceneContainer,
        changeScene,
      });
      changeScene(titleSceneContainer, settingsSceneContainer) 
    },
  });
})();

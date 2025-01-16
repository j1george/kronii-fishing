import { Application, Container } from "pixi.js";
import { setupMainMenuScene } from "./main-menu-scene";
import { setupGameScene } from "./game-scene";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  const gameScene = new Container();

  setupMainMenuScene(app, gameScene);
  setupGameScene(app, gameScene);
})();

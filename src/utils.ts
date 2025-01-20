import { Application, FillInput, Graphics, Text } from "pixi.js";


export const createButton = (params: {
  app: Application,
  label: string,
  onClick: () => void,
  buttonColor: FillInput,
  index: number,
}) => {
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
};

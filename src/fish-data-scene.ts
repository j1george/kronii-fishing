import { Container, Text } from 'pixi.js';
import ConvertCsvToJson from 'convert-csv-to-json';
import { ScrollBox } from '@pixi/ui';

/*
*   Fish Data Scene
* just a scene to test csv to json library
*/
export const setupFishDataScene = async (container: Container) => {
  const csvText = await loadCSV('data/test-data.csv');

  const scrollBox = new ScrollBox({
    background: 0x000000,
    width: 900,
    height: 600,
    type: 'vertical',
    items: ConvertCsvToJson.fieldDelimiter(',').csvStringToJson(csvText).map((fishObject: any) => new Text({
          text: JSON.stringify(fishObject, null, 2),
          style: {
            fontFamily: "Arial",
            fontSize: 14,
            fill: 0xffffff,
          },
        })),
  });

  container.addChild(scrollBox);
};

const loadCSV = async (url: string) => {
  const response = await fetch(url);

  return response.text();
};

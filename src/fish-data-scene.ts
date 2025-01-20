import { Container, Text } from 'pixi.js';
import ConvertCsvToJson from 'convert-csv-to-json';

/*
*   Fish Data Scene
* just a scene to test csv to json library
*/
export const setupFishDataScene = async (container: Container) => {
  const csvText = await loadCSV('data/test-data.csv');

  console.log({csvText});
  const jsonData = ConvertCsvToJson.fieldDelimiter(',').csvStringToJson(csvText).slice(0, 5);
  console.log({jsonData});
  const jsonText = new Text({
    text: JSON.stringify(jsonData, null, 2),
    style: {
      fontFamily: "Arial",
      fontSize: 12,
      fill: 0xffffff,
    },
  });

  container.addChild(jsonText);
};

const loadCSV = async (url: string) => {
  const response = await fetch(url);

  return response.text();
};

import { Container, Text } from 'pixi.js';
import ConvertCsvToJson from 'convert-csv-to-json';

/*
*   Fish Data Scene
* just a scene to test csv to json library
*/
export const setupFishDataScene = async (container: Container) => {
  const csvText = await loadCSV('data/test-data.csv');

  const jsonData = ConvertCsvToJson.fieldDelimiter(',').csvStringToJson(csvText).slice(0, 5);

  const jsonText = new Text({
    text: JSON.stringify(jsonData, null, 2),
    style: {
      fontFamily: "Arial",
      fontSize: 12,
      fill: 0xffffff,
    },
  });
  //
  //
  //
  //
  interface fishData {
    fishName: string;
    scientificName: string;
    type: string;
    averageLenght: string;
    averageWeight: string;
    catchMethod: string;
    catchQuote: string;
    fishDescription: string;
    habitat: string;
    population: string;
    pricePerPound: string;
    gameRarity: string;
  };
  //indexing
  const fishes: Record<string, fishData> = {};

  jsonData.forEach((fishObject) => {
    const fishData: fishData = {
      fishName: fishObject["FishName"],
      scientificName: fishObject["ScientificName"],
      type: fishObject["Type"],
      averageLenght: fishObject["AverageLength(ft)"],
      averageWeight: fishObject["AverageWeight(lb)"],
      catchMethod: fishObject["CatchMethod"],
      catchQuote: fishObject["CatchQuote"],
      fishDescription: fishObject["FishDescription"],
      habitat: fishObject["Habitat"],
      population: fishObject["Population"],
      pricePerPound: fishObject["PricePerlb(usd)"],
      gameRarity: fishObject["ProposedGameRarity"]
  };
    console.log("Processing fish: ",fishObject["FishName"], fishData)
    fishes[fishObject["FishName"]] = fishData;
  });
  console.log("Final fishes object: ",fishes)
  //store in localforage
  //
  //
  //
  container.addChild(jsonText);
};

const loadCSV = async (url: string) => {
  const response = await fetch(url);

  return response.text();
};

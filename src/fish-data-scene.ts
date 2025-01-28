import { Container, Text } from 'pixi.js';
import ConvertCsvToJson from 'convert-csv-to-json';
import { ScrollBox } from '@pixi/ui';
import localforage from 'localforage';

/*
*   Fish Data Scene
* just a scene to test csv to json library
*/
export const setupFishDataScene = async (container: Container) => {
  const csvText = await loadCSV('data/test-data.csv');

  const jsonData = ConvertCsvToJson.fieldDelimiter(',').csvStringToJson(csvText).slice(0, 5);

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
  /*
  * Localforage DB setup
  */
  localforage.config({
    name:"Kronii fishing game",
    storeName: "fishObjectDB",
    description: "Database used to store the fish JSON objects",
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
  try{
    await localforage.setItem("fishes",fishes);
  }catch(error){
    console.error("Error storing data: ", error)
  }
  //
  //
  //
  container.addChild(scrollBox);
};

const loadCSV = async (url: string) => {
  const response = await fetch(url);

  return response.text();
};

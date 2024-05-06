export type PlantationDemoType = {
	title: string,
  plantation: {
    id: number,
    plantType: string,
    seasson: string,
    waterAmount: number,
    details: string
  },
  visibility: boolean,
  score: number
};

export type PlantationsDemoDataType = PlantationDemoType[];

export const plantationsDemoData: PlantationsDemoDataType = [

];
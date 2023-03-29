export interface digitizedLocationsInterface {
  type: string;
  features: [
    {
      type: string;
      geometry: { type: string; coordinates: number[] };
      properties: {
        description: string;
        id: number;
        name: string;
      };
    }
  ];
}

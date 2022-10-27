export interface IMapInfo {
  results: {
    formatted_address: string,
    geometry: {
      location: {
        lat: number,
        lng: number,
      },
    },
  }[],
  status: string
}

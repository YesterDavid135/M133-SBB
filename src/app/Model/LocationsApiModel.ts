export interface LocationsApiModel {
  stations: Station[]
}

export interface Station {
  id: string
  name: string
  score: any
  coordinate: Coordinate
  distance: any
  icon: string
}

export interface Coordinate {
  type: string
  x: number
  y: number
}

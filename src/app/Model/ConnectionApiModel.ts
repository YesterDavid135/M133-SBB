export interface ConnectionApiModel {
  connections: Connection[]
  from: From2
  to: To2
  stations: Stations
}

export interface Connection {
  from: From
  to: To
  duration: string
  transfers: number
  service: any
  products: string[]
  capacity1st: any
  capacity2nd: any
  sections: Section[]
}

export interface From {
  station: Station
  arrival: any
  arrivalTimestamp: any
  departure: string
  departureTimestamp: number
  delay: number
  platform: string
  prognosis: Prognosis
  realtimeAvailability: any
  location: Location
}

export interface Station {
  id: string
  name: string
  score: any
  coordinate: Coordinate
  distance: any
}

export interface Coordinate {
  type: string
  x: number
  y: number
}

export interface Prognosis {
  platform: any
  arrival: any
  departure: string
  capacity1st: any
  capacity2nd: any
}

export interface Location {
  id: string
  name: string
  score: any
  coordinate: Coordinate2
  distance: any
}

export interface Coordinate2 {
  type: string
  x: number
  y: number
}

export interface To {
  station: Station2
  arrival: string
  arrivalTimestamp: number
  departure: any
  departureTimestamp: any
  delay: any
  platform: string
  prognosis: Prognosis2
  realtimeAvailability: any
  location: Location2
}

export interface Station2 {
  id: string
  name: string
  score: any
  coordinate: Coordinate3
  distance: any
}

export interface Coordinate3 {
  type: string
  x: number
  y: number
}

export interface Prognosis2 {
  platform: any
  arrival: any
  departure: any
  capacity1st: any
  capacity2nd: any
}

export interface Location2 {
  id: string
  name: string
  score: any
  coordinate: Coordinate4
  distance: any
}

export interface Coordinate4 {
  type: string
  x: number
  y: number
}

export interface Section {
  journey: Journey
  walk: any
  departure: Departure
  arrival: Arrival
}

export interface Journey {
  name: string
  category: string
  subcategory: any
  categoryCode: any
  number: string
  operator: string
  to: string
  passList: PassList[]
  capacity1st: any
  capacity2nd: any
}

export interface PassList {
  station: Station3
  arrival?: string
  arrivalTimestamp?: number
  departure?: string
  departureTimestamp?: number
  delay: number
  platform?: string
  prognosis: Prognosis3
  realtimeAvailability: any
  location: Location3
}

export interface Station3 {
  id: string
  name: string
  score: any
  coordinate: Coordinate5
  distance: any
}

export interface Coordinate5 {
  type: string
  x: number
  y: number
}

export interface Prognosis3 {
  platform: any
  arrival?: string
  departure?: string
  capacity1st: any
  capacity2nd: any
}

export interface Location3 {
  id: string
  name: string
  score: any
  coordinate: Coordinate6
  distance: any
}

export interface Coordinate6 {
  type: string
  x: number
  y: number
}

export interface Departure {
  station: Station4
  arrival: any
  arrivalTimestamp: any
  departure: string
  departureTimestamp: number
  delay: number
  platform: string
  prognosis: Prognosis4
  realtimeAvailability: any
  location: Location4
}

export interface Station4 {
  id: string
  name: string
  score: any
  coordinate: Coordinate7
  distance: any
}

export interface Coordinate7 {
  type: string
  x: number
  y: number
}

export interface Prognosis4 {
  platform: any
  arrival: any
  departure: string
  capacity1st: any
  capacity2nd: any
}

export interface Location4 {
  id: string
  name: string
  score: any
  coordinate: Coordinate8
  distance: any
}

export interface Coordinate8 {
  type: string
  x: number
  y: number
}

export interface Arrival {
  station: Station5
  arrival: string
  arrivalTimestamp: number
  departure: any
  departureTimestamp: any
  delay: number
  platform: string
  prognosis: Prognosis5
  realtimeAvailability: any
  location: Location5
}

export interface Station5 {
  id: string
  name: string
  score: any
  coordinate: Coordinate9
  distance: any
}

export interface Coordinate9 {
  type: string
  x: number
  y: number
}

export interface Prognosis5 {
  platform: any
  arrival: string
  departure: any
  capacity1st: any
  capacity2nd: any
}

export interface Location5 {
  id: string
  name: string
  score: any
  coordinate: Coordinate10
  distance: any
}

export interface Coordinate10 {
  type: string
  x: number
  y: number
}

export interface From2 {
  id: string
  name: string
  score: any
  coordinate: Coordinate11
  distance: any
}

export interface Coordinate11 {
  type: string
  x: number
  y: number
}

export interface To2 {
  id: string
  name: string
  score: any
  coordinate: Coordinate12
  distance: any
}

export interface Coordinate12 {
  type: string
  x: number
  y: number
}

export interface Stations {
  from: From3[]
  to: To3[]
}

export interface From3 {
  id: string
  name: string
  score: any
  coordinate: Coordinate13
  distance: any
}

export interface Coordinate13 {
  type: string
  x: number
  y: number
}

export interface To3 {
  id: string
  name: string
  score: any
  coordinate: Coordinate14
  distance: any
}

export interface Coordinate14 {
  type: string
  x: number
  y: number
}

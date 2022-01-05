export interface Farm {
  name: string,
  location: string
}

export interface FarmData {
  farmId: number,
  datetime: Date,
  sensorType: string,
  value: number
}

export interface RawData {
  location: string,
  datetime: string,
  sensorType: string,
  value: string
}

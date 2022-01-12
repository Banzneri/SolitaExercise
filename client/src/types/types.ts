export interface Farm {
  id: number,
  name: string,
  location: string
}

export interface FarmData {
  farmId: number,
  dateTime: Date,
  sensorType: string,
  value: number
}

export interface ResponseData {
  id: number,
  farm_id: number,
  time: Date,
  sensor_type: string,
  value: number
}

export interface RawData {
  location: string,
  datetime: string,
  sensorType: string,
  value: string
}

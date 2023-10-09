export interface DestinationEntity {
  id: number;
  name: string;
  description: string;
  country: string;
  climate: string
  currency: string
  latitude: number
  longitude: number
}

export interface ServerError {
  code: number;
  message: string;
}

import { DestinationEntity } from './interfaces'

/**
 * Function to convert degrees to radians.
 */
const getRadians = (degrees: number) => degrees * Math.PI / 180.0

/**
 * Function to calculate distance between two coordinates on the globe.
 */
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Radius of the Earth in km

  const dLat = getRadians(lat2 - lat1)
  const dLon = getRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(getRadians(lat1)) * Math.cos(getRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in km
}

interface NearbyDestination extends DestinationEntity {
  distance: number
}

/**
 * Function to find the closest cities to a given point. This function calculates the distance to each city using getDistance,
 * sorts them in ascending order of distance, and then returns the first 5.
 */
export const getNearbyDestinations = (destinations: DestinationEntity[], initialDestination: DestinationEntity): DestinationEntity[] =>
  destinations.reduce((acc: NearbyDestination[], item: DestinationEntity): NearbyDestination[] => {
    if (item.id !== initialDestination.id) {
      acc.push({
        ...item,
        distance: getDistance(initialDestination.latitude, initialDestination.longitude, item.latitude, item.longitude),
      })
    }
    return acc
  }, []).sort((a, b) => a.distance - b.distance)
    .slice(0, 5)

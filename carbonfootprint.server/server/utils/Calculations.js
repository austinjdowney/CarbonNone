import { carsService } from '../services/CarsService'
import { housesService } from '../services/HousesService'

export async function dailyScore(day) {
  const car = await carsService.getCarById(day.carId)
  const house = await housesService.getHouseById(day.houseId)
  let totalScore = (day.carMiles / car.mpg) * car.transportationFactor
  totalScore += ((day.busMiles * 0.1) / 15)
  totalScore += ((house.electricKwh * 0.309) / house.members)
  totalScore += ((house.waterGallons * 0.08) / house.members)
  return totalScore
}

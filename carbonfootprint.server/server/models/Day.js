import mongoose from 'mongoose'
import { carsService } from '../services/CarsService'
import { housesService } from '../services/HousesService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Day = new Schema(
  {
    creatorId: { type: String, ref: 'Account', required: true },
    carId: { type: ObjectId },
    houseId: { type: ObjectId },
    date: { type: Date, required: true },
    busMiles: { type: Number, default: 0 },
    carMiles: { type: Number, default: 0 },
    walkMiles: { type: Number, default: 0 },
    bikeMiles: { type: Number, default: 0 },
    totalMiles: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Day.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Day.virtual('dailyScore').get(async function() {
  const car = await carsService.getCarById(this.carId)
  const house = await housesService.getHouseById(this.houseId)
  let totalScore = (this.carMiles / car.mpg) * car.transportationFactor
  totalScore += ((this.busMiles * 0.1) / 15)
  totalScore += ((house.electricKwh * 0.309) / house.members)
  totalScore += ((house.waterGallons * 0.08) / house.members)
  return totalScore
})

export default Day

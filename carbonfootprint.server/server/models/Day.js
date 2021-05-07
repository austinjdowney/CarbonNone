import mongoose from 'mongoose'
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
    dailyScore: { type: Number, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Day.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Day

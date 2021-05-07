import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Car = new Schema(
  {
    title: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mpg: { type: Number, required: true },
    gasType: { type: String, required: true, default: 'unleaded' },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Car.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Car.virtual('transportationFactor').get(function() {
  let factor = 0
  if (this.gasType === 'unleaded') {
    factor = 11.2
  } else if (this.gasType === 'hybrid') {
    factor = 8.78
  } else if (this.gasType === 'diesel') {
    factor = 14.3
  }
  return factor
})

export default Car

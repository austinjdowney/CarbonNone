import mongoose from 'mongoose'
const Schema = mongoose.Schema

const House = new Schema(
  {
    title: { type: String, required: true },
    members: { type: Number, required: true },
    electricKwh: { type: Number, required: true },
    waterGallons: { type: Number, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

House.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default House

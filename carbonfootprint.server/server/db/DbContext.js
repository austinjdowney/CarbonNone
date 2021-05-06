import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import DaySchema from '../models/Day'
import HouseSchema from '../models/House'
import CarSchema from '../models/Car'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Day = mongoose.model('Day', DaySchema);
  Car = mongoose.model('Car', CarSchema);
  House = mongoose.model('House', HouseSchema);
}

export const dbContext = new DbContext()

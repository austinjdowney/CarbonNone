import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import DaySchema from '../models/Day'
import HouseSchema from '../models/House'
import CarSchema from '../models/Car'

class DbContext {
  Accounts = mongoose.model('Account', AccountSchema);
  Days = mongoose.model('Day', DaySchema);
  Cars = mongoose.model('Car', CarSchema);
  Houses = mongoose.model('House', HouseSchema);
}

export const dbContext = new DbContext()

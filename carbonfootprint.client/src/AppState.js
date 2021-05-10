import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  activeProfile: null,
  profiles: [],
  house: [],
  cars: [],
  days: [],
  currentDay: null,
  defaultCars: [
    {
      title: 'coupe',
      make: 'coupe',
      model: 'coupe',
      year: 2021,
      mpg: 30,
      gasType: 'unleaded'
    },
    {
      title: 'sedan(unleaded)',
      make: 'sedan(unleaded)',
      model: 'sedan(unleaded)',
      year: 2021,
      mpg: 23,
      gasType: 'unleaded'
    },
    {
      title: 'sedan(diesel)',
      make: 'sedan(diesel)',
      model: 'sedan(diesel)',
      year: 2021,
      mpg: 48,
      gasType: 'diesel'
    },
    {
      title: 'sedan(hybrid)',
      make: 'sedan(hybrid)',
      model: 'sedan(hybrid)',
      year: 2021,
      mpg: 52,
      gasType: 'hybrid'
    },
    {
      title: 'SUV',
      make: 'SUV',
      model: 'SUV',
      year: 2021,
      mpg: 18,
      gasType: 'unleaded'
    },
    {
      title: 'motorcycle',
      make: 'motorcycle',
      model: 'motorcycle',
      year: 2021,
      mpg: 45,
      gasType: 'unleaded'
    },
    {
      title: 'Truck(unleaded)',
      make: 'Truck(unleaded)',
      model: 'Truck(unleaded)',
      year: 2021,
      mpg: 16,
      gasType: 'unleaded'
    },
    {
      title: 'Truck(diesel)',
      make: 'Truck(diesel)',
      model: 'Truck(diesel)',
      year: 2021,
      mpg: 18,
      gasType: 'diesel'
    }
  ],
  defaultHouse: [{
    title: 'National Average Home Usage',
    members: 1,
    electricKwh: 877,
    waterGallons: 3000
  }]
})

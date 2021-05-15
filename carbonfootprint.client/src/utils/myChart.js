import { Chart, registerables } from 'chart.js'
import { AppState } from '../AppState'
import { daysService } from '../services/DaysService'
Chart.register(...registerables)

export async function drawChart() {
  const chart = document.getElementById('myChart').getContext('2d')
  const dates = await getDates()
  const dailyScore = await getScores()
  const myColor = '#08A045'
  const myColorLight = '#27D36C'
  const myChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'Daily Score',
        data: dailyScore,
        backgroundColor: myColorLight,
        borderColor: myColor,
        borderRadius: 5,
        borderWidth: 2,
        cutout: 45
      }],
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  })
  return myChart
}

async function getDates() {
  let days = await daysService.getDaysByProfileId(AppState.activeProfile.id)
  if (days.length >= 7) {
    days = days.splice(0, 7)
  }
  console.log(days)
  const dates = days.map(d => d.date.slice(5, 10))
  return dates
}

async function getScores() {
  let days = await daysService.getDaysByProfileId(AppState.activeProfile.id)
  if (days.length >= 7) {
    days = days.splice(0, 7)
  }
  const dailyScore = days.map(d => d.dailyScore)

  return dailyScore
}

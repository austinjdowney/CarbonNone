<script>
import { Line, mixins } from 'vue-chartjs'
const {
  reactiveProp
} = mixins

export default {
  name: 'MyChart',
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
      default: null
    }
  },
  mounted() {
    const scores = this.chartData.map(s => s.dailyScore)
    const dates = this.chartData.map(s => s.date)
    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: scores
          }
        ]
      })
  }
}
</script>

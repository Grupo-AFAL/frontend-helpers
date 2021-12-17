import { Controller } from '@hotwired/stimulus'

/**
 * ChartController
 * Uses the chartkick and charts.js library to render charts
 * https://github.com/ankane/chartkick.js
 *
 * Chart Types:
 * - LineChart
 * - PieChart
 * - ColumnChart
 * - BarChart
 * - AreaChart
 * - ScatterChart
 * - GeoChart
 * - Timeline
 *
 * How to use:
 *
 * <div id="any-id" data-controller="chart" data-chart-data-value="{}" data-chart-type-value="LineChart">
 *   Cargando...
 * </div>
 */
export class ChartController extends Controller {
  static values = {
    type: String,
    options: Object
  }

  async connect () {
    await import('chartjs-adapter-date-fns')
    const { default: Chartkick } = await import('chartkick')
    const { Chart, registerables } = await import('chart.js')

    Chart.register(...registerables)
    Chartkick.use(Chart)

    const chartType = this.typeValue || this.data.get('type')
    const options = this.optionsValue || JSON.parse(this.data.get('options'))

    // Data can't the Stimulus Values API because sometimes is an Object and
    // sometimes an Array
    const jsonData = this.data.get('data') || this.data.get('data-value')
    const data = JSON.parse(jsonData)
    const elementId = this.element.id

    this.chart = new Chartkick[chartType](elementId, data, options)
  }
}

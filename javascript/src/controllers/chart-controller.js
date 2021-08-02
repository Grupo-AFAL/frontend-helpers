import { Controller } from 'stimulus'

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
 * <div id="any-id" data-controller="chart" data-chart-data="{}" data-chart-type="LineChart">
 *   Cargando...
 * </div>
 */

 import {Chart} from 'chart.js' // eslint-disable-line

 export class ChartController extends Controller {
  async connect () {
    // const { default: Chart } = await import('chart.js') // eslint-disable-line
    const { default: Chartkick } = await import('chartkick')
    console.log(Chart)
    Chartkick.adapters.push(Chart)

    const chartType = this.data.get('type')
    const data = JSON.parse(this.data.get('data'))
    const elementId = this.element.id

    console.log(Chartkick.adapters);
    this.chart = new Chartkick[chartType](elementId, data, {})
  }
}

import { Controller } from 'stimulus'

export default class ChartController extends Controller {
  async connect () {
    const { default: Chartkick } = await import('chartkick')
    const { default: Chart } = await import('chart.js') // eslint-disable-line

    const chartType = this.data.get('type')
    const data = JSON.parse(this.data.get('data'))
    const elementId = this.element.id

    this.chart = new Chartkick[chartType](elementId, data, {})
  }
}

import { Controller } from 'stimulus'

/**
 * Tabs controller
 *
 * <div data-controller="tabs">
 *   <div class="tabs">
 *     <ul>
 *       <li class="is-active" data-tab-index="1" data-action="click->tabs#open">
 *         <a>Activities</a>
 *       </li>
 *       <li data-tab-index="2" data-action="click->tabs#open">
 *         <a>Other tab</a>
 *       </li>
 *     </ul>
 *   </div>
 *   <div class="content">
 *     <div data-content-index="1">
 *       Activities tab content
 *     </div>
 *     <div data-content-index="2" class="is-hidden">
 *       Other tab content
 *     </div>
 *   </div>
 * </div>
 */

export default class TabsController extends Controller {
  open (event) {
    const index = event.currentTarget.getAttribute('data-tab-index')

    this._hideAllTabs()
    this._openTab(index)
  }

  _hideAllTabs () {
    const allContents = this.element.querySelectorAll(`[data-content-index]`)
    Array.from(allContents).forEach(t => t.classList.add('is-hidden'))

    const allTabs = this.element.querySelectorAll(`[data-tab-index]`)
    Array.from(allTabs).forEach(t => t.classList.remove('is-active'))
  }

  _openTab (index) {
    const contentDiv = this.element.querySelector(
      `[data-content-index="${index}"]`
    )
    contentDiv.classList.remove('is-hidden')

    const tabLi = this.element.querySelector(`[data-tab-index="${index}"]`)
    tabLi.classList.add('is-active')
  }
}

import { Controller } from 'stimulus'

/*
  Tabs controller
  It generates a tabs component with open and hide content actions
  with active tab property.
*/

export class TabsController extends Controller {
  open (event) {
    const index = event.currentTarget.getAttribute('data-tab-index')

    this._hideAllTabs()
    this._openTab(index)
  }

  _hideAllTabs () {
    const allContents = this.element.querySelectorAll('[data-content-index]')
    Array.from(allContents).forEach(t => t.classList.add('is-hidden'))

    const allTabs = this.element.querySelectorAll('[data-tab-index]')
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

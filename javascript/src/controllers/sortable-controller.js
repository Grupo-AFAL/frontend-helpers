import { Controller } from '@hotwired/stimulus'
import Sortable from 'sortablejs'
import { patch } from '@rails/request.js'

export class SortableController extends Controller {
  static values = {
    resourceName: String,
    positionParamName: { type: String, default: 'position' },
    listParamName: String,
    responseKind: { type: String, default: 'html' },
    animation: { type: Number, default: 150 },
    handle: String,
    groupName: String,
    disabled: { type: Boolean, default: false }
  }

  connect () {
    this.sortable = new Sortable(this.element, {
      group: this.groupNameValue,
      animation: this.animationValue,
      handle: this.handleValue || undefined,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      disabled: this.disabledValue,
      onEnd: this.onEnd,
      onMove: this.onMove
    })
  }

  onEnd = async ({ item, newIndex, to }) => {
    if (!item.dataset.sortableUpdateUrl) return

    const positionParam = this.resourceNameValue
      ? `${this.resourceNameValue}[${this.positionParamNameValue}]`
      : this.positionParamNameValue

    const listIdParam = this.resourceNameValue
      ? `${this.resourceNameValue}[${this.listParamNameValue}]`
      : this.listParamNameValue

    const toListId = to.dataset.sortableListId || ''

    const data = new FormData()
    data.append(positionParam, newIndex + 1)
    data.append(listIdParam, toListId)

    await patch(item.dataset.sortableUpdateUrl, {
      body: data,
      responseKind: this.responseKindValue
    })
  }

  onMove = (event, _originalEvent) => {
    const itemPullDisabled = event.dragged.dataset.sortableItemPull === 'false'

    if (itemPullDisabled && this.itemChangedSortableList(event)) {
      return false
    }
  }

  itemChangedSortableList = event => {
    return event.to.dataset.sortableListId !== event.from.dataset.sortableListId
  }
}

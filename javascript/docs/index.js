import './index.scss'

import { Application } from '@hotwired/stimulus'

import { AutoPlayAudioController } from '../src/controllers/auto-play-audio-controller'
import { AutocompleteAddressController } from '../src/controllers/autocomplete-address-controller'
import { CarouselController } from '../src/controllers/carousel-controller'
import { ChartController } from '../src/controllers/chart-controller'
import { DatepickerController } from '../src/controllers/datepicker-controller'
import { DisappearController } from '../src/controllers/disappear-controller'
import { DropdownController } from '../src/controllers/dropdown-controller'
import { DynamicFieldsController } from '../src/controllers/dynamic-fields-controller'
import { HovercardController } from '../src/controllers/hovercard-controller'
import { NavbarController } from '../src/controllers/navbar-controller'
import { NotificationController } from '../src/controllers/notification-controller'
import { RadioToggleController } from '../src/controllers/radio-toggle-controller'
import { PrintController } from '../src/controllers/print-controller'
import { SlimSelectController } from '../src/controllers/slim-select-controller'
import { SortableController } from '../src/controllers/sortable-controller'
import { SubmitOnChangeController } from '../src/controllers/submit-on-change-controller'
import { TabsController } from '../src/controllers/tabs-controller'
import { ImagePreviewController } from '../src/controllers/image-preview-controller'

const application = Application.start()
application.register('auto-play-audio', AutoPlayAudioController)
application.register('autocomplete-address', AutocompleteAddressController)
application.register('carousel', CarouselController)
application.register('chart', ChartController)
application.register('datepicker', DatepickerController)
application.register('disappear', DisappearController)
application.register('dropdown', DropdownController)
application.register('dynamic-fields', DynamicFieldsController)
application.register('hovercard', HovercardController)
application.register('navbar', NavbarController)
application.register('notification', NotificationController)
application.register('print', PrintController)
application.register('radio-toggle', RadioToggleController)
application.register('slim-select', SlimSelectController)
application.register('sortable', SortableController)
application.register('submit-on-change', SubmitOnChangeController)
application.register('tabs', TabsController)
application.register('image-preview', ImagePreviewController)

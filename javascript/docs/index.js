import './index.scss'

import { Application } from 'stimulus'

import { AutoPlayAudioController } from '../src/controllers/auto-play-audio-controller'
import { AutocompleteAddressController } from '../src/controllers/autocomplete-address-controller'
import { ChartController } from '../src/controllers/chart-controller'
import { DatepickerController } from '../src/controllers/datepicker-controller'
import { DropdownController } from '../src/controllers/dropdown-controller'
import { DynamicFieldsController } from '../src/controllers/dynamic-fields-controller'
import { HovercardController } from '../src/controllers/hovercard-controller'
import { NavbarController } from '../src/controllers/navbar-controller'
import { NotificationController } from '../src/controllers/notification-controller'
import { SelectController } from '../src/controllers/select-controller'
import { SubmitOnChangeController } from '../src/controllers/submit-on-change-controller'
import { TabsController } from '../src/controllers/tabs-controller'
import { TagsController } from '../src/controllers/tags-controller'

const application = Application.start()
application.register('auto-play-audio', AutoPlayAudioController)
application.register('autocomplete-address', AutocompleteAddressController)
application.register('chart', ChartController)
application.register('datepicker', DatepickerController)
application.register('dropdown', DropdownController)
application.register('dynamic-fields', DynamicFieldsController)
application.register('hovercard', HovercardController)
application.register('navbar', NavbarController)
application.register('notification', NotificationController)
application.register('select', SelectController)
application.register('submit-on-change', SubmitOnChangeController)
application.register('tabs', TabsController)
application.register('tags', TagsController)

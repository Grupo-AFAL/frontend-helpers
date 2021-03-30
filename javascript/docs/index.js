import './index.scss'

import { Application } from 'stimulus'

import { ChartController } from '../src/controllers/chart-controller'
import { DatepickerController } from '../src/controllers/datepicker-controller'
import { DropdownController } from '../src/controllers/dropdown-controller'
import { HovercardController } from '../src/controllers/hovercard-controller'
import { NavbarController } from '../src/controllers/navbar-controller'
import { NotificationController } from '../src/controllers/notification-controller'
import { TabsController } from '../src/controllers/tabs-controller'
import { TagsController } from '../src/controllers/tags-controller'
import { DynamicFieldsController } from '../src/controllers/dynamic-fields-controller'

const application = Application.start()
application.register('chart', ChartController)
application.register('datepicker', DatepickerController)
application.register('dropdown', DropdownController)
application.register('dynamic-fields-controller.js', DynamicFieldsController)
application.register('hovercard', HovercardController)
application.register('navbar', NavbarController)
application.register('notification', NotificationController)
application.register('tabs', TabsController)
application.register('tags', TagsController)

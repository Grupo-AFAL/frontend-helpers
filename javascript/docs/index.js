import './index.scss'

import { Application } from 'stimulus'

import { ChartController } from '../src/controllers/chart-controller'
import { DropdownController } from '../src/controllers/dropdown-controller'
import { TagsController } from '../src/controllers/tags-controller'

const application = Application.start()
application.register('chart', ChartController)
application.register('dropdown', DropdownController)
application.register('tags', TagsController)

import './index.scss'

import { Application } from 'stimulus'

import { DropdownController } from '../src/controllers/dropdown-controller'
import { TabsController } from '../src/controllers/tabs-controller'
import { TagsController } from '../src/controllers/tags-controller'
import { HovercardController } from '../src/controllers/hovercard-controller'

const application = Application.start()
application.register('dropdown', DropdownController)
application.register('hovercard', HovercardController)
application.register('tabs', TabsController)
application.register('tags', TagsController)

import { Application } from 'stimulus'

import { DropdownController } from '../src/controllers/dropdown-controller'
import { TagsController } from '../src/controllers/tags-controller'

const application = Application.start()
application.register('dropdown', DropdownController)
application.register('tags', TagsController)

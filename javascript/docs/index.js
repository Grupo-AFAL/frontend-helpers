import { Application } from 'stimulus'

import { DropdownController } from '../src/controllers/dropdown-controller'

const application = Application.start()
application.register('dropdown', DropdownController)

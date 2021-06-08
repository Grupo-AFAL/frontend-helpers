import { RemoteModalController } from './remote-modal-controller'
/**
 * Loads remote content into a drawer window and handles form submission
 *
 * It expects the following structure:
 *
 * <section data-controller="remote-drawer">
 *   <a href="http://localhost/customers/new" data-action="remote-drawer#open">
 *    Add Customer
 *   </a>
 *   <div id="drawer-template" class="modal drawer">
 *     <button data-action="remote-drawer#submit">Save</button>
 *     <a data-action="remote-drawer#close">Cancel</a>
 *   </div>
 * </section>
 */
export class RemoteDrawerController extends RemoteModalController {
  hello () {
    console.log('hello')
  }
}

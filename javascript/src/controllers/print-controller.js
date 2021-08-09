import { Controller } from 'stimulus'

/* 
* Print Controller
* 
* This controller is responsible for printing the current page.
*/

export class PrintController extends Controller {

  print() {
    window.print()
    this.printDialog.close()
  }
}
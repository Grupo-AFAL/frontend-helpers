import { Controller } from 'stimulus';

class DropdownController extends Controller {
  constructor(...args) {
    super(...args);

    this.closeDropdowns = () => {
      this.element.classList.remove('is-active');
    };
  }

  connect() {
    document.addEventListener('click', this.closeDropdowns);
  }

  disconnect() {
    document.removeEventListener('click', this.closeDropdowns);
  }

  toggleMenu(e) {
    e.stopPropagation();
    e.preventDefault();
    this.element.classList.toggle('is-active');
  }

}

/**
 * Returns a 13 digit timestamp + random number between 1 and 100
 */
const getTimestamp = () => {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  return new Date().getTime().toString() + randomNumber;
};

const replaceInFragment = (fragment, regex, replaceValue) => {
  const templateString = fragment.innerHTML.replace(regex, replaceValue);
  return stringToDOMNode(templateString);
};
const stringToDOMNode = htmlString => {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content;
};
const removeNonHiddenFormElements = fragment => {
  const removeNodes = input => {
    if (input.type === 'hidden') return;
    input.remove();
  };

  fragment.querySelectorAll('input').forEach(removeNodes);
  fragment.querySelectorAll('textarea').forEach(removeNodes);
  fragment.querySelectorAll('select').forEach(removeNodes);
  return fragment;
};
const previousSibling = (element, selector) => {
  let previousElement = element.previousElementSibling;
  if (!previousElement) return null;

  while (!previousElement.matches(selector)) {
    previousElement = previousElement.previousElementSibling;
    if (!previousElement) return null;
  }

  return previousElement;
};
const nextSibling = (element, selector) => {
  let nextElement = element.nextElementSibling;
  if (!nextElement) return null;

  while (!nextElement.matches(selector)) {
    nextElement = nextElement.nextElementSibling;
    if (!nextElement) return null;
  }

  return nextElement;
};

class DynamicFieldsController extends Controller {
  connect() {
    this.fieldsSelector = this.data.get('selector');
    this.removeDuplicates = this.data.get('removeDuplicates');

    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true);
    }
  }

  addFields(e) {
    e.preventDefault();
    if (this.isAtMaximumSize()) return false;
    this.setSize(this.getSize() + 1);
    const template = this.removeDuplicates ? this.templateFragmentWithoutDuplicates() : this.templateFragment();
    const positionInput = template.querySelector('[data-position]');
    if (positionInput) positionInput.value = this.getSize();
    this.containerTarget.appendChild(template);

    if (this.isAtMaximumSize()) {
      this.buttonTarget.setAttribute('disabled', true);
    }
  }

  removeFields(e) {
    e.preventDefault();
    this.setSize(this.getSize() - 1);
    const fieldsContainer = e.target.closest(this.fieldsSelector);
    fieldsContainer.style.display = 'none';
    removeNonHiddenFormElements(fieldsContainer);
    fieldsContainer.querySelector('.destroy-flag').value = true;

    if (this.hasButtonTarget && this.buttonTarget.hasAttribute('disabled')) {
      this.buttonTarget.removeAttribute('disabled');
    }
  }

  moveUp(e) {
    e.preventDefault();
    const fieldsContainer1 = e.target.closest(this.fieldsSelector);
    const fieldsContainer2 = previousSibling(fieldsContainer1, this.fieldsSelector);
    this.swapElements(fieldsContainer1, fieldsContainer2);
    this.resetPositionValues();
  }

  moveDown(e) {
    e.preventDefault();
    const fieldsContainer1 = e.target.closest(this.fieldsSelector);
    const fieldsContainer2 = nextSibling(fieldsContainer1, this.fieldsSelector);
    this.swapElements(fieldsContainer1, fieldsContainer2);
    this.resetPositionValues();
  }

  swapElements(elm1, elm2) {
    var parent, next1, next2;
    if (elm2 == null) return;
    parent = elm1.parentNode;
    next1 = elm1.nextElementSibling;
    next2 = elm2.nextElementSibling;
    parent.insertBefore(elm2, next1);
    parent.insertBefore(elm1, next2);
  }

  resetPositionValues() {
    this.element.querySelectorAll(this.fieldsSelector).forEach((fields, index) => {
      fields.querySelector('[data-position]').value = index + 1;
    });
  }

  templateFragment() {
    return replaceInFragment(this.templateTarget, /new_record/g, getTimestamp());
  }

  templateFragmentWithoutDuplicates() {
    // Get currently selected values
    const selectedValues = Array.from(this.element.querySelectorAll(`${this.fieldsSelector} select`)).map(node => node.value); // Remove already selected values

    const template = this.templateFragment();
    template.querySelectorAll('select option').forEach(option => {
      if (selectedValues.includes(option.value)) {
        option.remove();
      }
    });
    return template;
  }

  dropdownOptionsSize() {
    return this.templateFragment().querySelectorAll('select option').length;
  }

  isAtMaximumSize() {
    return this.removeDuplicates && this.dropdownOptionsSize() === this.getSize();
  }

  getSize() {
    return parseInt(this.data.get('size'));
  }

  setSize(size) {
    this.data.set('size', size);
  }

}
DynamicFieldsController.targets = ['template', 'container', 'button'];

export { DropdownController, DynamicFieldsController };
//# sourceMappingURL=index.modern.js.map

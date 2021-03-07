(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stimulus')) :
  typeof define === 'function' && define.amd ? define(['exports', 'stimulus'], factory) :
  (global = global || self, factory(global.frontendHelpers = {}, global.Stimulus));
}(this, (function (exports, stimulus) {
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  var DropdownController = /*#__PURE__*/function (_Controller) {
    _inheritsLoose(DropdownController, _Controller);

    function DropdownController() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Controller.call.apply(_Controller, [this].concat(args)) || this;

      _this.closeDropdowns = function () {
        _this.element.classList.remove('is-active');
      };

      return _this;
    }

    var _proto = DropdownController.prototype;

    _proto.connect = function connect() {
      document.addEventListener('click', this.closeDropdowns);
    };

    _proto.disconnect = function disconnect() {
      document.removeEventListener('click', this.closeDropdowns);
    };

    _proto.toggleMenu = function toggleMenu(e) {
      e.stopPropagation();
      e.preventDefault();
      this.element.classList.toggle('is-active');
    };

    return DropdownController;
  }(stimulus.Controller);

  /**
   * Returns a 13 digit timestamp + random number between 1 and 100
   */
  var getTimestamp = function getTimestamp() {
    var randomNumber = Math.floor(Math.random() * 100 + 1);
    return new Date().getTime().toString() + randomNumber;
  };

  var replaceInFragment = function replaceInFragment(fragment, regex, replaceValue) {
    var templateString = fragment.innerHTML.replace(regex, replaceValue);
    return stringToDOMNode(templateString);
  };
  var stringToDOMNode = function stringToDOMNode(htmlString) {
    var template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content;
  };
  var removeNonHiddenFormElements = function removeNonHiddenFormElements(fragment) {
    var removeNodes = function removeNodes(input) {
      if (input.type === 'hidden') return;
      input.remove();
    };

    fragment.querySelectorAll('input').forEach(removeNodes);
    fragment.querySelectorAll('textarea').forEach(removeNodes);
    fragment.querySelectorAll('select').forEach(removeNodes);
    return fragment;
  };
  var previousSibling = function previousSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    if (!previousElement) return null;

    while (!previousElement.matches(selector)) {
      previousElement = previousElement.previousElementSibling;
      if (!previousElement) return null;
    }

    return previousElement;
  };
  var nextSibling = function nextSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    if (!nextElement) return null;

    while (!nextElement.matches(selector)) {
      nextElement = nextElement.nextElementSibling;
      if (!nextElement) return null;
    }

    return nextElement;
  };

  var DynamicFieldsController = /*#__PURE__*/function (_Controller) {
    _inheritsLoose(DynamicFieldsController, _Controller);

    function DynamicFieldsController() {
      return _Controller.apply(this, arguments) || this;
    }

    var _proto = DynamicFieldsController.prototype;

    _proto.connect = function connect() {
      this.fieldsSelector = this.data.get('selector');
      this.removeDuplicates = this.data.get('removeDuplicates');

      if (this.isAtMaximumSize()) {
        this.buttonTarget.setAttribute('disabled', true);
      }
    };

    _proto.addFields = function addFields(e) {
      e.preventDefault();
      if (this.isAtMaximumSize()) return false;
      this.setSize(this.getSize() + 1);
      var template = this.removeDuplicates ? this.templateFragmentWithoutDuplicates() : this.templateFragment();
      var positionInput = template.querySelector('[data-position]');
      if (positionInput) positionInput.value = this.getSize();
      this.containerTarget.appendChild(template);

      if (this.isAtMaximumSize()) {
        this.buttonTarget.setAttribute('disabled', true);
      }
    };

    _proto.removeFields = function removeFields(e) {
      e.preventDefault();
      this.setSize(this.getSize() - 1);
      var fieldsContainer = e.target.closest(this.fieldsSelector);
      fieldsContainer.style.display = 'none';
      removeNonHiddenFormElements(fieldsContainer);
      fieldsContainer.querySelector('.destroy-flag').value = true;

      if (this.hasButtonTarget && this.buttonTarget.hasAttribute('disabled')) {
        this.buttonTarget.removeAttribute('disabled');
      }
    };

    _proto.moveUp = function moveUp(e) {
      e.preventDefault();
      var fieldsContainer1 = e.target.closest(this.fieldsSelector);
      var fieldsContainer2 = previousSibling(fieldsContainer1, this.fieldsSelector);
      this.swapElements(fieldsContainer1, fieldsContainer2);
      this.resetPositionValues();
    };

    _proto.moveDown = function moveDown(e) {
      e.preventDefault();
      var fieldsContainer1 = e.target.closest(this.fieldsSelector);
      var fieldsContainer2 = nextSibling(fieldsContainer1, this.fieldsSelector);
      this.swapElements(fieldsContainer1, fieldsContainer2);
      this.resetPositionValues();
    };

    _proto.swapElements = function swapElements(elm1, elm2) {
      var parent, next1, next2;
      if (elm2 == null) return;
      parent = elm1.parentNode;
      next1 = elm1.nextElementSibling;
      next2 = elm2.nextElementSibling;
      parent.insertBefore(elm2, next1);
      parent.insertBefore(elm1, next2);
    };

    _proto.resetPositionValues = function resetPositionValues() {
      this.element.querySelectorAll(this.fieldsSelector).forEach(function (fields, index) {
        fields.querySelector('[data-position]').value = index + 1;
      });
    };

    _proto.templateFragment = function templateFragment() {
      return replaceInFragment(this.templateTarget, /new_record/g, getTimestamp());
    };

    _proto.templateFragmentWithoutDuplicates = function templateFragmentWithoutDuplicates() {
      // Get currently selected values
      var selectedValues = Array.from(this.element.querySelectorAll(this.fieldsSelector + " select")).map(function (node) {
        return node.value;
      }); // Remove already selected values

      var template = this.templateFragment();
      template.querySelectorAll('select option').forEach(function (option) {
        if (selectedValues.includes(option.value)) {
          option.remove();
        }
      });
      return template;
    };

    _proto.dropdownOptionsSize = function dropdownOptionsSize() {
      return this.templateFragment().querySelectorAll('select option').length;
    };

    _proto.isAtMaximumSize = function isAtMaximumSize() {
      return this.removeDuplicates && this.dropdownOptionsSize() === this.getSize();
    };

    _proto.getSize = function getSize() {
      return parseInt(this.data.get('size'));
    };

    _proto.setSize = function setSize(size) {
      this.data.set('size', size);
    };

    return DynamicFieldsController;
  }(stimulus.Controller);

  DynamicFieldsController.targets = ['template', 'container', 'button'];

  exports.DropdownController = DropdownController;
  exports.DynamicFieldsController = DynamicFieldsController;

})));
//# sourceMappingURL=index.umd.js.map

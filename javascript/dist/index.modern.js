import{Controller as e}from"stimulus";class t extends e{constructor(...e){super(...e),this.closeDropdowns=()=>{this.element.classList.remove("is-active")}}connect(){document.addEventListener("click",this.closeDropdowns)}disconnect(){document.removeEventListener("click",this.closeDropdowns)}toggleMenu(e){e.stopPropagation(),e.preventDefault(),this.element.classList.toggle("is-active")}}class s extends e{connect(){this.fieldsSelector=this.data.get("selector"),this.removeDuplicates=this.data.get("removeDuplicates"),this.isAtMaximumSize()&&this.buttonTarget.setAttribute("disabled",!0)}addFields(e){if(e.preventDefault(),this.isAtMaximumSize())return!1;this.setSize(this.getSize()+1);const t=this.removeDuplicates?this.templateFragmentWithoutDuplicates():this.templateFragment(),s=t.querySelector("[data-position]");s&&(s.value=this.getSize()),this.containerTarget.appendChild(t),this.isAtMaximumSize()&&this.buttonTarget.setAttribute("disabled",!0)}removeFields(e){e.preventDefault(),this.setSize(this.getSize()-1);const t=e.target.closest(this.fieldsSelector);t.style.display="none",(e=>{const t=e=>{"hidden"!==e.type&&e.remove()};e.querySelectorAll("input").forEach(t),e.querySelectorAll("textarea").forEach(t),e.querySelectorAll("select").forEach(t)})(t),t.querySelector(".destroy-flag").value=!0,this.hasButtonTarget&&this.buttonTarget.hasAttribute("disabled")&&this.buttonTarget.removeAttribute("disabled")}moveUp(e){e.preventDefault();const t=e.target.closest(this.fieldsSelector),s=((e,t)=>{let s=e.previousElementSibling;if(!s)return null;for(;!s.matches(t);)if(s=s.previousElementSibling,!s)return null;return s})(t,this.fieldsSelector);this.swapElements(t,s),this.resetPositionValues()}moveDown(e){e.preventDefault();const t=e.target.closest(this.fieldsSelector),s=((e,t)=>{let s=e.nextElementSibling;if(!s)return null;for(;!s.matches(t);)if(s=s.nextElementSibling,!s)return null;return s})(t,this.fieldsSelector);this.swapElements(t,s),this.resetPositionValues()}swapElements(e,t){var s,i;null!=t&&(i=t.nextElementSibling,(s=e.parentNode).insertBefore(t,e.nextElementSibling),s.insertBefore(e,i))}resetPositionValues(){this.element.querySelectorAll(this.fieldsSelector).forEach((e,t)=>{e.querySelector("[data-position]").value=t+1})}templateFragment(){return e=this.templateTarget,t=(()=>{const e=Math.floor(100*Math.random()+1);return(new Date).getTime().toString()+e})(),(e=>{const t=document.createElement("template");return t.innerHTML=e,t.content})(e.innerHTML.replace(/new_record/g,t));var e,t}templateFragmentWithoutDuplicates(){const e=Array.from(this.element.querySelectorAll(`${this.fieldsSelector} select`)).map(e=>e.value),t=this.templateFragment();return t.querySelectorAll("select option").forEach(t=>{e.includes(t.value)&&t.remove()}),t}dropdownOptionsSize(){return this.templateFragment().querySelectorAll("select option").length}isAtMaximumSize(){return this.removeDuplicates&&this.dropdownOptionsSize()===this.getSize()}getSize(){return parseInt(this.data.get("size"))}setSize(e){this.data.set("size",e)}}s.targets=["template","container","button"];export{t as DropdownController,s as DynamicFieldsController};
//# sourceMappingURL=index.modern.js.map

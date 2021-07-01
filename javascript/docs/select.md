---
title: Select
description: Custom select with autocomplete
---

### Select

Select a single item from a list

<div
  data-controller="select"
  class="autocomplete-input-container"
  data-select-search-placeholder-value="Filtrar..."
  data-select-container-class="is-fullwidth"
  id="first-select"
>
  <select name="field">
    <option value>Select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3" selected>Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

### Select with data info

Select a single item from a list with custom text on right

<div
  data-controller="select"
  class="autocomplete-input-container"
  data-select-search-placeholder-value="Filtrar..."
  data-select-container-class="is-fullwidth"
  id="second-select"
>
  <select name="field">
    <option value>Select an option</option>
    <option data-info="Text on right 1" value="One">Item One</option>
    <option data-info="2 days ago" value="Two">Item Two</option>
    <option data-info="15 in stock" value="Three">Item Three</option>
    <option data-info="Last purchase 15 days ago" value="Four">Item Four</option>
    <option data-info="Custom data info" value="Five" selected>Custom Value</option>
  </select>
</div>
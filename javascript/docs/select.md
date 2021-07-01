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

### Select

Select a single item from a list with custom text on right

<div
  data-controller="select"
  class="autocomplete-input-container"
  data-select-search-placeholder-value="Filtrar..."
  data-select-container-class="is-fullwidth"
>
  <select name="field">
    <option value>Select an option</option>
    <option data-info="Text on right 1" value="1">One</option>
    <option data-info="Text on right 2" value="2">Two</option>
    <option data-info="Text on right 3" value="3" selected>Three</option>
    <option data-info="Text on right 4" value="4">Four</option>
    <option data-info="Text on right 5" value="5">Five</option>
    <option data-info="Text on right 6" value="6">Six</option>
  </select>
</div>
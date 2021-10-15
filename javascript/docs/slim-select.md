---
title: Slim select
description: Select with autocomplete, multiple options and other goodies
---

### Select single item

Select a single item from a list

<div
  class="slim-select"
  id="single-select"
>
  <select name="field" data-controller="slim-select">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3" selected>Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

### Select single item with search

Select a single item from a list with search enabled

<div
  class="slim-select"
  id="search-select"
>
  <select name="field" data-controller="slim-select" data-slim-select-show-search-value="true">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3" selected>Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

### Select multiple items

Select multiple item from a list

<div
  class="slim-select"
  id="multi-select"
>
  <select name="field" data-controller="slim-select" multiple>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3" selected>Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

### Select single with custom HTML

Select a single item from a list with custom HTML

<div
  class="slim-select"
  id="custom-select"
>
  <select name="field" data-controller="slim-select">
    <option data-inner-html="<strong>Strong:<strong> Item one" value="One">Item One</option>
    <option data-inner-html="<i>Italics:<i> Item two" value="Two">Item Two</option>
    <option data-inner-html="<img src='https://via.placeholder.com/150 /> Con imagen" value="Three">Con imagen</option>
  </select>
</div>

### Select with placeholder

Select multiple items from a list with a placeholder

<div
  class="slim-select"
  id="placeholder-select"
>
  <select name="field" data-controller="slim-select" data-slim-select-placeholder-value="Select options.." multiple>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

### Position options list up

Select single item and position the options list on top of the input

<div
  class="slim-select"
  id="show-content-select"
>
  <select name="field" data-controller="slim-select" data-slim-select-show-content-value="up">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </select>
</div>

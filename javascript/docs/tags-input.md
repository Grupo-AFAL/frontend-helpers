---
title: Tags Input
description: Custom input for selecting multiple existing values or creating new ones
---

### Tags with text only

With option to create new items

<div id="tags-with-text" class="autocomplete-input-container" data-controller="tags"
  data-tags-items-value='["One","Two","Three","Four","Five","Six"]' data-tags-input-name-value="field">
  <div class="input" data-tags-target="fakeInput">
    <div data-tags-target="container"></div>
    <input type="text" data-tags-target="input" placeholder="Select or create tag">
  </div>
  <ul class="results is-hidden" data-tags-target="results"></ul>
</div>

### Tags with ID and Value

Without the option to create new ones

<div id="tags-with-id-value" class="autocomplete-input-container" data-controller="tags"
  data-tags-items-value='[["One", 1],["Two", 2],["Three",3],["Four",4],["Five",5],["Six",6]]'
  data-tags-selected-items-value='[1]' data-tags-input-name-value="field" data-tags-add-items-value="false">
  <div class="input" data-tags-target="fakeInput">
    <div data-tags-target="container"></div>
    <input type="text" data-tags-target="input" placeholder="Select tag">
  </div>
  <ul class="results is-hidden" data-tags-target="results"></ul>
</div>

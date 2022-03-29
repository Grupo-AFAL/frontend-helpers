---
title: Sortable
description: The sortable component used for reordering lists with drag-and-drop
---

### Simple List (drag and drop or reorder items)

<br />

<div class="sortable" data-controller="sortable">
  <div class="sortable-item">Item 1</div>
  <div class="sortable-item">Item 2</div>
  <div class="sortable-item">Item 3</div>
  <div class="sortable-item">Item 4</div>
  <div class="sortable-item">Item 5</div>
</div>

<br />
<br />

### Shared lists (drag and drop to another list)

<br />

<div class="sortable" data-controller="sortable" data-sortable-group-name-value="shared">
  <div class="sortable-item">Item 1</div>
  <div class="sortable-item">Item 2</div>
  <div class="sortable-item">Item 3</div>
  <div class="sortable-item">Item 4</div>
  <div class="sortable-item">Item 5</div>
</div>
<br />
<div class="sortable" data-controller="sortable" data-sortable-group-name-value="shared">
  <div class="sortable-item">Item 6</div>
  <div class="sortable-item">Item 7</div>
  <div class="sortable-item">Item 8</div>
  <div class="sortable-item">Item 9</div>
  <div class="sortable-item">Item 10</div>
</div>

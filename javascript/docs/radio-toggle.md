---
title: Radio Toggle
description: Show content based on radio button value
---

<div data-controller="radio-toggle" data-radio-toggle-current-value="one">
  <div class="control">
    <label class="radio" for="one">
      <input type="radio" value="one" checked="checked" name="toggle" id="one" data-action="radio-toggle#change"> One
    </label>
    <label class="radio" for="two">
      <input type="radio" value="two" name="toggle" id="two" data-action="radio-toggle#change"> Two
    </label>
  </div>

  <br />

  <div class="box" data-radio-toggle-target="element" data-radio-toggle-value="one">
    <h1 class="title is-1">One</h1>
  </div>

  <div class="box" data-radio-toggle-target="element" data-radio-toggle-value="two">
    <h1 class="title is-1">Two</h1>
  </div>
</div>

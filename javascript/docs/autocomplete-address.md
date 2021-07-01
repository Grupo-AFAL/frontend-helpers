---
title: Autocomplete Address Field
description: Autocomplete address field component
---

<div data-controller="autocomplete-address">
  <div id="field-full_address" class="field">
    <label class="label ">Enter Location</label>
    <div class="control ">
      <input data-autocomplete-address-target="input" class="input pac-target-input" type="text" autocomplete="off">
    </div>
  </div>

  <input data-autocomplete-address-target="street" type="hidden">
  <input data-autocomplete-address-target="streetNumber" type="hidden">
  <input data-autocomplete-address-target="neighbourhood" type="hidden" >
  <input data-autocomplete-address-target="city" type="hidden">
  <input data-autocomplete-address-target="state" type="hidden">
  <input data-autocomplete-address-target="country" type="hidden">
  <input data-autocomplete-address-target="postalCode" type="hidden">
  <input data-autocomplete-address-target="latitude" type="hidden">
  <input data-autocomplete-address-target="longitude" type="hidden">
</div>

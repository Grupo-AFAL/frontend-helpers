---
title: Image Preview
description: Image Preview component
---

<div data-controller="image-preview" class="image-content">
  <figure class="image is-128x128" style="height: 100% !important;">
    <img data-image-preview-target="output" src="https://images.unsplash.com/photo-1638376867769-2102c0c89b61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80">
  </figure>
  <input accept=".jpg, .jpeg, .png" id="file-input" data-image-preview-target="input" data-action="change->image-preview#showImage" type="file" style="margin-top: 15px;">
</div>

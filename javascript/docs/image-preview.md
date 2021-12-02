---
title: Image Preview
description: Bulma tabs component
---

<div data-controller="image-preview" class="image-content">
  <figure class="image is-128x128" style="height: 100% !important;">
    <img data-image-preview-target="output" src="http://guarderia.lvh.me:3000/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c8778274940f59fac22b5efadeb2fe4491647a02/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWVScEFlUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--eacce5e23def9b603d7de281a826257d3e87660c/ben-white-qDY9ahp0Mto-unsplash.jpg">
  </figure>
  <input accept=".jpg, .jpeg, .png" id="file-input" data-image-preview-target="input" data-action="change->image-preview#showImage" class="input" type="file" name="daycare_child[profile_picture]" style="margin-top: 15px;">
</div>

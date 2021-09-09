---
title: Notification
description: Bulma notification component
---

### Fixed notification

<div data-controller="notification" data-notification-delay-value="3000" class="notification fixed is-success">
  <button data-action="notification#close" class="delete"></button>
  Fixed notification
</div>

### Auto dissapearing after 3 seconds

<div data-controller="notification" data-notification-delay-value="3000" class="notification is-success">
  <button data-action="notification#close" class="delete"></button>
  Auto dissapearing after 3 seconds
</div>

### Custom delay of 10 seconds

<div data-controller="notification" data-notification-delay-value="10000" class="notification is-success">
  <button data-action="notification#close" class="delete"></button>
  Custom delay of 10 seconds
</div>

### Manual closing

<div data-controller="notification" class="notification is-success">
  <button data-action="notification#close" class="delete"></button>
  Manual closing
</div>
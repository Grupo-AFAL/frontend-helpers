---
title: Tabs
description: Bulma tabs component
---

<div data-controller="tabs">
  <div class="tabs">
    <ul>
      <li class="is-active" data-tab-index="1" data-action="click->tabs#open">
        <a>Activities</a>
      </li>
      <li data-tab-index="2" data-action="click->tabs#open">
        <a>Other tab</a>
      </li>
    </ul>
  </div>
  <div class="content">
    <div data-content-index="1">
      Activities tab content
    </div>
    <div data-content-index="2" class="is-hidden">
      Other tab content
    </div>
  </div>
</div>

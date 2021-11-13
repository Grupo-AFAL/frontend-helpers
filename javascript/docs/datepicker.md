---
title: Datepicker
description: Datepicker component that uses the flatpicker library
---

### Basic

<div class="default-datepicker">
  <input type="text" data-controller="datepicker">
</div>

**Code**

```html
<input type="text" data-controller="datepicker" />
```

### Date and Time

<input type="text" data-controller="datepicker" data-datepicker-enable-time="true">

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time="true"
/>
```

### Only Time

<input type="text" data-controller="datepicker" data-datepicker-enable-time="true" data-datepicker-no-calendar="true">

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time="true"
  data-datepicker-no-calendar="true"
/>
```

### 24 hr time with seconds

<input
  type="text"
  data-controller="datepicker" data-datepicker-enable-time="true" 
  data-datepicker-enable-seconds="true"
  data-datepicker-no-calendar="true"
  data-datepicker-time-24hr="true"
/>

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time="true"
  data-datepicker-enable-seconds="true"
  data-datepicker-no-calendar="true"
  data-datepicker-24hr="true"
/>
```

### Time with a minimum, maximum and default values

<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time="true"
  data-datepicker-no-calendar="true"
  data-datepicker-min-time="10:00"
  data-datepicker-max-time="14:00"
  data-datepicker-default-date="2021-08-05 12:00"
/>

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time="true"
  data-datepicker-no-calendar="true"
  data-datepicker-min-time="10:00"
  data-datepicker-max-time="14:00"
  data-datepicker-default-date="2021-08-05 12:00"
/>
```

### Calendar using English language

<div class="english-datepicker">
  <input type="text" data-controller="datepicker" data-datepicker-locale="en"/>
</div>
**Code**

```html
<input type="text" data-controller="datepicker" data-datepicker-locale="en" />
```

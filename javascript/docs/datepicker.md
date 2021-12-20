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

<input type="text" data-controller="datepicker" data-datepicker-enable-time-value="true">

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
/>
```

### Only Time

<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-no-calendar-value="true"
/>

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-no-calendar-value="true"
/>
```

### Time with seconds

<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-enable-seconds-value="true"
  data-datepicker-no-calendar-value="true"
/>

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-enable-seconds-value="true"
  data-datepicker-no-calendar-value="true"
/>
```

### Time with a minimum, maximum and default values

<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-no-calendar-value="true"
  data-datepicker-min-time-value="10:00"
  data-datepicker-max-time-value="14:00"
  data-datepicker-default-date-value="2021-08-05 12:00"
/>

**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-enable-time-value="true"
  data-datepicker-no-calendar-value="true"
  data-datepicker-min-time-value="10:00"
  data-datepicker-max-time-value="14:00"
  data-datepicker-default-date-value="2021-08-05 12:00"
/>
```

### Calendar using English language

<div class="english-datepicker">
  <input type="text" data-controller="datepicker" data-datepicker-locale-value="en"/>
</div>
**Code**

```html
<input
  type="text"
  data-controller="datepicker"
  data-datepicker-locale-value="en"
/>
```

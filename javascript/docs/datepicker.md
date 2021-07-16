---
title: Datepicker
description: Datepicker component that uses the flatpicker library
---

### Basic

<input type="text" data-controller="datepicker">

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

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

### datepicker with buttons to go to the previous or next date

<div class="manual-flatpickr">
  <div class="field is-horizontal flatpickr" data-controller="datepicker" data-datepicker-alt-input-class-value="form-control input has-text-centered">
    <button class="button is-transparent" data-action="datepicker#getCustomDate" data-datepicker-date-by-param="day" data-datepicker-add-param="false" id="previous-btn">
      <span class="icon">
        <svg viewBox="0 0 13 20" class="svg-inline">
          <path d="M12.5098 1.86961L10.7298 0.0996094L0.839844 9.99961L10.7398 19.8996L12.5098 18.1296L4.37984 9.99961L12.5098 1.86961Z" fill="currentColor"></path>
        </svg>
      </span>
    </button>
    <div class="control is-fullwidth ">
      <input data-action="submit-on-change#submit" value="2022-03-30" manual="date_by day" control_class="is-fullwidth " class="input flatpickr-input" type="hidden" name="date" id="date">
    </div>
    <button class="button is-transparent" data-action="datepicker#getCustomDate" data-datepicker-date-by-param="day" data-datepicker-add-param="true" id="next-btn">
      <span class="icon">
        <svg viewBox="0 0 13 20" class="svg-inline">
          <path d="M0.490234 18.1296L2.26023 19.8996L12.1602 9.99961L2.26023 0.0996094L0.490234 1.86961L8.62023 9.99961L0.490234 18.1296Z" fill="currentColor"></path>
        </svg>
      </span>
    </button>
  </div>
</div>

# frozen_string_literal: true

# rubocop:disable Layout/LineLength
# rubocop:disable Metrics/ModuleLength
module IconComponents
  ARROW_LEFT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4
          44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7
          24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" class=""></path>
    </svg>
  )

  ARROW_RIGHT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6
           467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3
           0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
        class=""></path>
    </svg>
  )

  CHECK_CIRCLE = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033
           248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379
           0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216
          308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248
          6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        class=""></path>
    </svg>
  )

  CREDIT_CARD = %(
    <svg viewBox="0 0 576 512" class="svg-inline">
      <path fill="currentColor"
        d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12
           12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128
           0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6
           0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
        class=""></path>
    </svg>
  )

  COMMENT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466
        2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7
        12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
        class=""></path>
    </svg>
  )

  EDIT = %(
    <svg viewBox="0 0 576 512" class="svg-inline">
      <path fill="currentColor"
        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4
           1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8
           0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0
           13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384
           346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5
           64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5
          48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
        class=""></path>
    </svg>
  )

  EXPAND = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0
           6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12
           12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148
           276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0
           24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160
           468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3
           10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
        class=""></path>
    </svg>
  )

  LONG_ARROW_ALT_LEFT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M134.059 296H436c6.627 0 12-5.373
           12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029
           239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411
           40.971-16.971V296z"
        class=""></path>
    </svg>
  )

  PLUS_CIRCLE = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
        class=""></path>
    </svg>
  )

  PLUS = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        class=""></path>
    </svg>
  )

  STICKY_NOTE = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-128 80v-76.118h76.118L320 428.106zM400 80v223.988H296c-13.255 0-24 10.745-24 24v104H48V80h352z"
        class=""></path>
    </svg>
  )

  NESTED_ARROW = %(
    <svg width="99" height="93" viewBox="0 0 99 93" fill="none">
      <path d="M1 57.9623V6C1 3.23858 3.23858 1 6 1H15V50.3579C15 53.01 16.0536 55.5536 17.929 57.429L18.5 58C18.7969 58.2969 19.1133 58.5937 19.4299 58.8789C21.0376 60.3271 23.1696 61 25.3333 61H69C70.1046 61 71 60.1046 71 59V45.6433C71 43.8884 73.0988 42.9843 74.374 44.19L97.0188 65.5996C97.8322 66.3687 97.8561 67.6556 97.0717 68.4543L74.4269 91.5108C73.1723 92.7882 71 91.8999 71 90.1094V77.5C71 76.3954 70.1046 75.5 69 75.5H18.7574C16.3351 75.5 13.9921 74.626 12.2044 72.9916C10.9045 71.8031 9.35088 70.3509 8 69C6.84337 67.8434 5.53809 66.6124 4.37071 65.5364C2.25043 63.582 1 60.8459 1 57.9623Z" fill="#E0E0E0" stroke="BDBDBD"/>
    </svg>
  )

  MONEY_BILL_WAVE = %(
    <svg viewBox="0 0 640 512" class="svg-inline">
      <path fill="currentColor"
        d="M320 144c-53.02 0-96 50.14-96 112 0 61.85 42.98 112 96 112 53 0 96-50.13 96-112 0-61.86-42.98-112-96-112zm0 192c-35.29 0-64-35.89-64-80s28.71-80 64-80 64 35.89 64 80-28.71 80-64 80zM621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34C70.34 94.34 46.9 79 32.25 79 15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.33-62.35 369.5-62.35 64.91 0 88.34 15.35 103 15.35 17.21 0 32.25-13.32 32.25-31.81V83.93c0-12.64-7.23-24.6-18.84-29.47zm-588.21 56.8c20.22 6.42 41.03 10.53 62.67 12.89-1.97 33.41-29.23 60.04-62.89 60.43l.22-73.32zM32 428.07l.13-42.54c33.58.07 60.88 26.31 63.38 59.43-22.45-3.04-43.63-8.45-63.51-16.89zm575.05-27.33c-20.16-6.4-40.9-10.51-62.47-12.87 2.89-32.5 29.69-58.14 62.69-58.52l-.22 71.39zm.31-103.54c-50 .34-90.59 39.32-94.58 88.6-70.73-1.43-137.18 15.82-200.6 31.87-75.07 19-126.54 31.21-184.41 29.87-1.23-52.02-43.48-94.01-95.55-94.13l.41-136.67c50.65-.34 91.72-40.32 94.78-90.52 70.53 1.41 137.02-15.83 200.4-31.87C402.6 75.41 454.3 63.13 512.03 64.46c.18 52.93 43.01 95.94 95.74 96.07l-.41 136.67zm.51-168.8c-34.24-.07-62.04-27.34-63.58-61.38 22.53 3.03 43.78 8.45 63.71 16.91l-.13 44.47z"
        class=""></path>
    </svg>
  )

  FACEBOOK_SQUARE = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
        class=""></path>
    </svg>
  )

  INSTAGRAM_SQUARE = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
        class=""></path>
    </svg>
  )

  STAR = %(
    <svg viewBox="0 0 576 512" class="svg-inline">
      <path fill="currentColor"
        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        class=""></path>
    </svg>
  )

  FIRE_ALT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <g>
        <path fill="currentColor"
          d="M323.56 51.2a597.38 597.38 0 0 0-56.22 60C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 210 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-52-163.14-124.44-230.4zm-1.12 366.87A165.81 165.81 0 0 1 226.86 448c-43.93 0-84.43-14.89-114.06-41.92a146.18 146.18 0 0 1-35.88-50.39C68.35 335.82 64 314 64 290.75c0-59.43 42.8-106.39 104.3-180.12 30 34.59 18.49 19.78 100.7 124.59l62-70.74c24.32 40.25 27.78 45.59 34.84 59.1a157.93 157.93 0 0 1 15 104.62c-7.49 36.85-28.24 68.8-58.4 89.87z"
          class=""></path>
        <path fill="currentColor"
          d="M304.09 391.85A134.39 134.39 0 0 1 226.86 416C154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 8 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 20 27.35 52.19 15.81 119-33.43 153.42z"
          class=""></path>
      </g>
    </svg>
  )

  CHEVRON_DOBLE_DOWN = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M207 477.5L12.7 283.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0l154.7 154 154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 477.5c-9.4 9.3-24.6 9.3-34 0zm34-192L435.3 91.1c9.4-9.4 9.4-24.6 0-33.9l-22.7-22.7c-9.4-9.4-24.5-9.4-33.9 0L224 188.5 69.3 34.5c-9.4-9.3-24.5-9.3-33.9 0L12.7 57.2c-9.4 9.4-9.4 24.6 0 33.9L207 285.5c9.4 9.3 24.6 9.3 34 0z"
        class=""></path>
    </svg>
  )

  CHEVRON_DOBLE_UP = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M241 34.5l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9l-22.7 22.7c-9.4 9.4-24.5 9.4-33.9 0L224 131.5l-154.7 154c-9.4 9.3-24.5 9.3-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.6 0-33.9L207 34.5c9.4-9.3 24.6-9.3 34 0zm-34 192L12.7 420.9c-9.4 9.4-9.4 24.6 0 33.9l22.7 22.7c9.4 9.4 24.5 9.4 33.9 0l154.7-154 154.7 154c9.4 9.3 24.5 9.3 33.9 0l22.7-22.7c9.4-9.4 9.4-24.6 0-33.9L241 226.5c-9.4-9.3-24.6-9.3-34 0z"
        class=""></path>
    </svg>
  )

  PAYPAL = %(
    <svg viewBox="0 0 384 512" class="svg-inline">
      <path fill="currentColor"
        d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
        class=""></path>
    </svg>
  )

  GIFT = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
        class=""></path>
    </svg>
  )

  MAP_MARKED_ALT = %(
    <svg viewBox="0 0 576 512" class="svg-inline">
      <path fill="currentColor"
        d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
        class=""></path>
    </svg>
  )

  PHONE_PLUS = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4zM16 144h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16h-64V16c0-8.8-7.2-16-16-16H96c-8.8 0-16 7.2-16 16v64H16C7.2 80 0 87.2 0 96v32c0 8.8 7.2 16 16 16z"
        class=""></path>
    </svg>
  )

  RECEIPT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M344 288H104c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8zM400.8 5.7L357.3 37 318.7 9.2c-16.8-12.1-39.2-12.1-56.1 0L224 37 185.4 9.2a47.888 47.888 0 0 0-56.1 0L90.7 37 47.2 5.7C27.4-8.5 0 5.6 0 29.9v452.3c0 23.8 27.1 38.6 47.2 24.2L90.7 475l38.6 27.8c16.8 12.1 39.2 12.1 56.1 0L224 475l38.6 27.8c16.8 12.1 39.3 12.1 56.1 0l38.6-27.8 43.5 31.3c19.8 14.2 47.2.1 47.2-24.1V29.9C448 6 420.9-8.7 400.8 5.7zm-.8 440.8l-42.7-30.7-66.7 48-66.7-48-66.7 48-66.7-48L48 446.5v-381l42.7 30.7 66.7-48 66.7 48 66.7-48 66.7 48L400 65.5v381zM344 176H104c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8z"
        class=""></path>
    </svg>
  )

  PEN = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
        class=""></path>
    </svg>
  )

  IMAGE = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
        class=""></path>
    </svg>
  )

  ELLIPSIS_H = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8
        0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72
        72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z">
      </path>
    </svg>
  )

  UPLOAD = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3
        5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0
        13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3
        10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7
        24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64
        0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
      </path>
    </svg>
  )

  CLOUD_UPLOAD_ALT = %(
    <svg viewBox="0 0 640 512" class="svg-inline">
      <path fill="currentColor"
        d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
        class=""></path>
    </svg>
  )

  COINS = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"
        class=""></path>
    </svg>
  )

  TRUCK = %(
    <svg viewBox="0 0 640 512" class="svg-inline">
      <path fill="currentColor"
        d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
        class=""></path>
    </svg>
  )

  USER_PLUS = %(
    <svg viewBox="0 0 640 512" class="svg-inline">
      <path fill="currentColor"
        d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
        class=""></path>
    </svg>
  )

  PRINT = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
        class=""></path>
    </svg>
  )

  TIMES_CIRCLE = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
        class=""></path>
    </svg>
  )

  SEARCH = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"
        class=""></path>
    </svg>
  )

  CHEVRON_DOWN = %(
    <svg viewBox="0 0 512 512" class="svg-inline">
      <path fill="currentColor"
        d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
        class=""></path>
    </svg>
  )

  CALENDAR_ALT = %(
    <svg viewBox="0 0 448 512" class="svg-inline">
      <path fill="currentColor"
        d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
        class=""></path>
    </svg>
  )

  SHOPPING_CART = %(
    <svg viewBox="0 0 576 512" class="svg-inline">
      <path fill="currentColor"
        d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
        class=""></path>
    </svg>
  )

  CALENDAR_MONTH = %(
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <rect x="17.5" y="0.5" width="7" height="7" rx="0.5" transform="rotate(90 17.5 0.5)" stroke="white"/>
      <rect x="7.5" y="0.5" width="7" height="7" rx="0.5" transform="rotate(90 7.5 0.5)" stroke="white"/>
      <rect x="17.5" y="11.5" width="7" height="7" rx="0.5" transform="rotate(90 17.5 11.5)" stroke="white"/>
      <rect x="7.5" y="11.5" width="7" height="7" rx="0.5" transform="rotate(90 7.5 11.5)" stroke="white"/>
    </svg>
  )

  CALENDAR_WEEK = %(
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
      <rect x="19.5" y="0.5" width="18" height="4" rx="0.5" transform="rotate(90 19.5 0.5)" stroke="white"/>
      <rect x="12.5" y="0.5" width="18" height="4" rx="0.5" transform="rotate(90 12.5 0.5)" stroke="white"/>
      <rect x="4.5" y="0.5" width="18" height="4" rx="0.5" transform="rotate(90 4.5 0.5)" stroke="white"/>
    </svg>
  )

  CALENDAR_DAY = %(
    <svg viewBox="0 0 10 10" fill="none">
      <rect x="9.5" y="0.5" width="9" height="9" rx="0.5" transform="rotate(90 9.5 0.5)" stroke="white"/>
    </svg>
  )
  
  REPORT = %(
    <svg viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2611 1.68457L12.1361 0.55957L11.0111 1.68457L9.88611 0.55957L8.76111 1.68457L7.63611 0.55957L6.51111 1.68457L5.38611 0.55957L4.26111 1.68457L3.13611 0.55957V11.0596H0.886108V13.3096C0.886108 14.5546 1.89111 15.5596 3.13611 15.5596H12.1361C13.3811 15.5596 14.3861 14.5546 14.3861 13.3096V0.55957L13.2611 1.68457ZM9.88611 14.0596H3.13611C2.72361 14.0596 2.38611 13.7221 2.38611 13.3096V12.5596H9.88611V14.0596ZM12.8861 13.3096C12.8861 13.7221 12.5486 14.0596 12.1361 14.0596C11.7236 14.0596 11.3861 13.7221 11.3861 13.3096V11.0596H4.63611V2.80957H12.8861V13.3096Z" fill="#474747" fill-opacity="0.9"/>
    </svg>
  )

  WEIGHT = %(
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1813 2.29384C10.9626 1.88226 11.5968 1.29124 12.0154 0.584695C12.0863 0.465004 12.0876 0.316443 12.0187 0.195559C11.9498 0.0746484 11.8214 0 11.6822 0H1.31767C1.17853 0 1.05008 0.0746484 0.981191 0.195533C0.912306 0.316443 0.91355 0.465004 0.984466 0.58467C1.40306 1.29121 2.03731 1.88226 2.81863 2.29381C3.48956 2.64725 4.24599 2.85589 5.02536 2.90504V3.9H3.19502C2.51067 3.9 1.93189 4.41223 1.84871 5.09148L1.06658 11.4788C1.01938 11.8641 1.13991 12.2518 1.39719 12.5425C1.65447 12.8333 2.02469 13 2.41289 13H10.5872C10.9754 13 11.3456 12.8333 11.6029 12.5426C11.8602 12.2518 11.9807 11.8641 11.9335 11.4788L11.1514 5.09153C11.0682 4.41226 10.4894 3.90005 9.80509 3.90005H7.97453V2.90509C8.75387 2.85589 9.51033 2.64725 10.1813 2.29384ZM9.80509 4.67457C10.0987 4.67457 10.3469 4.89427 10.3826 5.18568L11.1647 11.5729C11.1852 11.7407 11.1349 11.9027 11.0229 12.0293C10.9109 12.1558 10.7562 12.2255 10.5872 12.2255H2.41287C2.24389 12.2255 2.08916 12.1558 1.97719 12.0292C1.86519 11.9027 1.81482 11.7407 1.83536 11.5729L2.61746 5.18568C2.65314 4.89432 2.90143 4.67459 3.195 4.67459H9.80509V4.67457ZM5.79987 3.90003V2.9166H7.19999V3.90003H5.79987ZM7.61609 2.14205H5.38377C4.07067 2.14205 2.86596 1.63135 2.08459 0.774566H10.9153C10.1339 1.63132 8.92919 2.14205 7.61609 2.14205Z" fill="#474747" fill-opacity="0.9"/>
      <path d="M6.50004 5.27625C4.75002 5.27625 3.32629 6.7 3.32629 8.45C3.32629 10.2 4.75004 11.6238 6.50004 11.6238C8.25003 11.6238 9.67379 10.2 9.67379 8.45C9.67379 6.69998 8.25006 5.27625 6.50004 5.27625ZM6.50004 10.8492C5.17711 10.8492 4.10086 9.77293 4.10086 8.45C4.10086 7.1271 5.17714 6.05081 6.50004 6.05081C7.82294 6.05081 8.89922 7.1271 8.89922 8.45C8.89922 9.77291 7.82294 10.8492 6.50004 10.8492Z" fill="#474747" fill-opacity="0.9"/>
      <path d="M6.77389 8.17606C6.62267 8.02481 6.37744 8.02481 6.22624 8.17606L5.2938 9.10851C5.14255 9.25974 5.14255 9.50496 5.2938 9.65619C5.36941 9.7318 5.46854 9.76963 5.56764 9.76963C5.66674 9.76963 5.76586 9.7318 5.84147 9.65619L6.77392 8.72374C6.92512 8.57251 6.92512 8.32729 6.77389 8.17606Z" fill="#474747" fill-opacity="0.9"/>
    </svg>
  )

  RECIPE_BOOK = %(
    <svg viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.31099 0C1.1398 0.000228451 0.187012 0.953173 0.187012 2.12429V12.8758C0.187012 14.047 1.1398 14.9999 2.31107 15.0001H12.337C12.5999 15.0001 12.813 14.787 12.813 14.5241V12.8758V11.2274V3.77264V0.475939C12.813 0.213068 12.5999 0 12.337 0H2.31099ZM2.31107 0.951878H11.8611V3.77264V10.7514H2.31099C1.87793 10.7515 1.47502 10.8821 1.13889 11.1054V2.12429C1.13889 1.47792 1.66478 0.951954 2.31107 0.951878ZM11.8611 14.0481H2.31115C1.66478 14.048 1.13889 13.5221 1.13889 12.8757C1.13889 12.2293 1.66471 11.7034 2.31107 11.7033H11.8611V12.3998H4.36713C4.10426 12.3998 3.89119 12.6128 3.89119 12.8757C3.89119 13.1386 4.10426 13.3517 4.36713 13.3517H11.8611V14.0481Z" fill="#474747" fill-opacity="0.9"/>
      <path d="M4.59672 6.67841V8.48043C4.59672 8.7433 4.80979 8.95637 5.07266 8.95637H7.92723C8.1901 8.95637 8.40317 8.7433 8.40317 8.48043V6.67848C9.03202 6.42604 9.4679 5.80938 9.4679 5.10453C9.4679 4.19568 8.74927 3.45162 7.85047 3.41065C7.53361 2.99136 7.03992 2.74121 6.50002 2.74121C5.95988 2.74121 5.46628 2.99136 5.14949 3.41065C4.25061 3.45162 3.53198 4.19576 3.53198 5.10453C3.53198 5.80946 3.96794 6.42604 4.59672 6.67841Z" fill="#474747" fill-opacity="0.9"/>
    </svg>    
  )

  MAP = {
    'arrow-left' => ARROW_LEFT,
    'arrow-right' => ARROW_RIGHT,
    'calendar-alt' => CALENDAR_ALT,
    'calendar-day' => CALENDAR_DAY,
    'calendar-month' => CALENDAR_MONTH,
    'calendar-week' => CALENDAR_WEEK,
    'check-circle' => CHECK_CIRCLE,
    'chevron-doble-down' => CHEVRON_DOBLE_DOWN,
    'chevron-doble-up' => CHEVRON_DOBLE_UP,
    'chevron-down' => CHEVRON_DOWN,
    'cloud-upload-alt' => CLOUD_UPLOAD_ALT,
    'coins' => COINS,
    'comment' => COMMENT,
    'credit-card' => CREDIT_CARD,
    'edit' => EDIT,
    'ellipsis-h' => ELLIPSIS_H,
    'expand' => EXPAND,
    'facebook-square' => FACEBOOK_SQUARE,
    'fire-alt' => FIRE_ALT,
    'gift' => GIFT,
    'image' => IMAGE,
    'instagram-square' => INSTAGRAM_SQUARE,
    'long-arrow-alt-left' => LONG_ARROW_ALT_LEFT,
    'map-marked-alt' => MAP_MARKED_ALT,
    'money-bill-wave' => MONEY_BILL_WAVE,
    'nested-arrow' => NESTED_ARROW,
    'paypal' => PAYPAL,
    'pen' => PEN,
    'phone-plus' => PHONE_PLUS,
    'plus' => PLUS,
    'plus-circle' => PLUS_CIRCLE,
    'print' => PRINT,
    'receipt' => RECEIPT,
    'recipe-book' => RECIPE_BOOK,
    'report' => REPORT,
    'search' => SEARCH,
    'shopping-cart' => SHOPPING_CART,
    'star' => STAR,
    'sticky-note' => STICKY_NOTE,
    'times-circle' => TIMES_CIRCLE,
    'truck' => TRUCK,
    'upload' => UPLOAD,
    'user-plus' => USER_PLUS,
    'weight' => WEIGHT
  }.freeze

  class IconNotAvailable < StandardError; end

  def icon_svgs(name)
    raise IconNotAvailable, "Icon: '#{name}' is not available" unless MAP.key?(name)

    MAP[name].html_safe
  end
end
# rubocop:enable Layout/LineLength
# rubocop:enable Metrics/ModuleLength

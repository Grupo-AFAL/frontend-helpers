---
title: Carousel
description: Carousel component
---

  <div class="glide" data-controller="carousel" data-carousel-index-value="1">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li class="glide__slide first">
          <figure class="image is-3by2">
              <image src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2064&q=80">
            </figure>
        </li>
        <li class="glide__slide second">
          <figure class="image is-3by2" style="">
            <image src="https://images.unsplash.com/photo-1636105143566-ee660d4c5933?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80">
          </figure>
        </li>
      </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
        <span class="icon">
          <svg viewBox="0 0 448 512" class="svg-inline">
            <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" class="">
            </path>
          </svg>
        </span>
      </button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
        <span class="icon">
          <svg viewBox="0 0 448 512" class="svg-inline">
            <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" class=""></path>
          </svg>
        </span>
      </button>
    </div>
  </div>

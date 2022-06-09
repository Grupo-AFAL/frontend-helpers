# frozen_string_literal: true

# rubocop:disable Layout/LineLength
module FrontendHelpers
  module IconComponents
    ARROW_BACK = %(
      <svg viewBox="0 0 13 20" class="svg-inline">
        <path d="M12.5098 1.86961L10.7298 0.0996094L0.839844 9.99961L10.7398 19.8996L12.5098 18.1296L4.37984 9.99961L12.5098 1.86961Z"
          fill="currentColor" />
      </svg>
    )

    ARROW_FORWARD = %(
      <svg viewBox="0 0 13 20" class="svg-inline">
        <path d="M0.490234 18.1296L2.26023 19.8996L12.1602 9.99961L2.26023 0.0996094L0.490234 1.86961L8.62023 9.99961L0.490234 18.1296Z"
          fill="currentColor" />
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

    ELLIPSIS_H = %(
      <svg viewBox="0 0 512 512" class="svg-inline">
        <path fill="currentColor"
          d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8
          0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72
          72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z">
        </path>
      </svg>
    )

    MINUS = %(
      <svg viewBox="0 0 14 2" class="svg-inline" fill="none">
        <path d="M0.599609 0H13.3996V1.60001H0.599609V0Z" fill="currentColor"/>
      </svg>
    )

    PLUS = %(
      <svg viewBox="0 0 448 512" class="svg-inline">
        <path fill="currentColor"
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
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

    TIMES_CIRCLE = %(
      <svg viewBox="0 0 512 512" class="svg-inline">
        <path fill="currentColor"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          class=""></path>
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

    MAP = {
      'arrow-back' => ARROW_BACK,
      'arrow-forward' => ARROW_FORWARD,
      'check-circle' => CHECK_CIRCLE,
      'ellipsis-h' => ELLIPSIS_H,
      'minus' => MINUS,
      'plus' => PLUS,
      'search' => SEARCH,
      'times-circle' => TIMES_CIRCLE,
      'upload' => UPLOAD
    }.freeze

    class IconNotAvailable < StandardError; end

    def icon_svgs(name)
      raise IconNotAvailable, "Icon: '#{name}' is not available" unless MAP.key?(name)

      MAP[name].html_safe
    end
  end
end
# rubocop:enable Layout/LineLength

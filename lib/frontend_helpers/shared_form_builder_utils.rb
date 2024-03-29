# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module FrontendHelpers
  module SharedFormBuilderUtils
    include BuilderHtmlUtils

    def label(method, text = nil, options = {}, &block)
      options[:class] = "label #{options[:class]}"
      super(method, text, options, &block)
    end

    def text_field(method, options = {})
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def text_area(method, options = {})
      options[:class] = field_class_name(method, "textarea #{options[:class]}")

      field_helper(method, super(method, options), options)
    end

    def email_field(method, options = {})
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def password_field(method, options = {})
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def file_field(method, options = {})
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def rich_text_area(method, options = {})
      max_attachments_size = options.dig(:attachments, :max_size) || 1
      default_error_msg = "Attachments must not exceed #{max_attachments_size}MB"
      error_message = options.dig(:attachments, :error_message) || default_error_msg

      options.with_defaults!(
        'data-controller': 'trix-attachments',
        'data-trix-attachments-max-size-value': max_attachments_size,
        'data-trix-attachments-error-message-value': error_message
      )

      options[:class] = "trix-content #{options[:class]}".strip
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def date_field(method, options = {})
      clear_btn = if options.delete(:clear)
                    content_tag(:div, class: 'control') do
                      content_tag(:a, class: 'button', data: { action: 'datepicker#clear' }) do
                        @template.icon_tag('times-circle')
                      end
                    end
                  end

      options[:control_class] = "is-fullwidth #{options[:control_class]}"

      wrapper_options = {
        class: 'field flatpickr',
        data: {
          controller: 'datepicker', 'datepicker-period-value': options[:period],
          'datepicker-locale-value': I18n.locale
        }
      }.merge!(options.delete(:wrapper_options) || {})

      wrapper_options[:class] += ' has-addons' if options[:manual]

      if options[:min_date].present?
        wrapper_options.merge!('data-datepicker-min-date-value': options[:min_date])
      end

      content_tag(:div, wrapper_options) do
        input_date_field(clear_btn, method, options)
      end
    end

    def input_date_field(clear_btn, method, options)
      if options[:manual]
        date_field_previous_btn + text_field(method, options) + date_field_next_btn + clear_btn
      else
        text_field(method, options) + clear_btn
      end
    end

    def date_field_previous_btn
      content_tag(:button, icon_tag('arrow-back'),
                  {
                    class: 'button is-transparent',
                    data: { action: 'datepicker#previousDate' }
                  })
    end

    def date_field_next_btn
      content_tag(:button, icon_tag('arrow-forward'),
                  {
                    class: 'button is-transparent',
                    data: { action: 'datepicker#nextDate' }
                  })
    end

    def datetime_field(method, options = {})
      options[:wrapper_options] = { 'data-datepicker-enable-time-value': true }
      date_field(method, options)
    end

    def time_field(method, options = {})
      options[:wrapper_options] = {
        'data-datepicker-enable-time-value': true,
        'data-datepicker-no-calendar-value': true
      }

      if options[:seconds]
        options[:wrapper_options].merge!(
          'data-datepicker-enable-seconds-value': true
        )
      end

      if options[:default_date].present?
        options[:wrapper_options].merge!(
          'data-datepicker-default-date-value': options[:default_date]
        )
      end

      if options[:min_time].present?
        options[:wrapper_options].merge!(
          'data-datepicker-min-time-value': options[:min_time]
        )
      end

      if options[:max_time].present?
        options[:wrapper_options].merge!(
          'data-datepicker-max-time-value': options[:max_time]
        )
      end

      value = object.send(method)

      # Adds a date if already doesn't include one (it will detect the date by an empty space),
      # so that the time_field_group can display its time value correctly
      options[:value] = [Date.current, value].join(' ') unless value.include?(' ')

      date_field(method, options)
    end

    def number_field(method, options = {})
      field_helper(method, super(method, field_options(method, options)), options)
    end

    def step_number_field(method, options = {})
      options[:data] ||= {}
      options[:data]['step-number-input-target'] = 'input'

      subtract_data = options.delete(:subtract_data) || {}
      add_data = options.delete(:add_data) || {}

      subtract_button_data = {
        action: ['step-number-input#subtract', subtract_data[:action]].compact.join(' '),
        'step-number-input-target': 'subtract'
      }

      add_button_data = {
        action: ['step-number-input#add', add_data[:action]].compact.join(' '),
        'step-number-input-target': 'add'
      }

      disabled = options[:disabled]
      button_class = class_names(['button', options[:button_class]], 'is-static': disabled)

      @template.content_tag(:div, class: 'field has-addons',
                                  data: { controller: 'step-number-input' }) do
        addon_left = @template.content_tag(:div, class: 'control') do
          @template.link_to icon_tag('minus'), '', class: button_class, disabled: disabled,
                                                   data: disabled ? {} : subtract_button_data,
                                                   title: 'subtract'
        end

        input = @template.content_tag(:div, class: 'control') do
          number_field(method, options)
        end

        addon_right = @template.content_tag(:div, class: 'control') do
          @template.link_to icon_tag('plus'), '', class: button_class, disabled: disabled,
                                                  data: disabled ? {} : add_button_data,
                                                  title: 'add'
        end

        @template.safe_join([addon_left, input, addon_right])
      end
    end

    # Uses the native HTML <select> element.
    #
    def select_field(method, values, options = {}, html_options = {})
      select_class = field_class_name(method, "select #{html_options.delete(:select_class)}")
      select_data = html_options.delete(:select_data)
      select_id = "#{method}_select_div"

      field = content_tag(:div, id: select_id, class: select_class, data: select_data) do
        select(method, values, options, html_options.except(:control_data, :control_class))
      end

      field_helper(method, field, field_options(method, html_options))
    end

    def slim_select_field(method, values, options = {}, html_options = {})
      html_options.with_defaults!(multiple: false, 'data-slim-select-target': 'select')

      options.with_defaults!(
        add_items: false,
        show_content: 'auto',
        show_search: true,
        search_placeholder: 'Buscar',
        add_to_body: false,
        close_on_select: true,
        allow_deselect_option: false,
        select_all: false,
        select_all_text: 'Select all',
        deselect_all_text: 'Deselect all'
      )

      html_options[:class] = class_names(
        "select #{html_options[:class]}".strip, 'is-multiple': html_options[:multiple]
      )

      field = content_tag(:div, slim_select_field_options(method, html_options, options)) do
        if options[:select_all]
          anchor_button('slim-select#selectAll', 'selectAllButton', options[:select_all_text]) +
            anchor_button('slim-select#deselectAll', 'deselectAllButton',
                          options[:deselect_all_text], 'display: none;') +
            select(method, values, options, html_options)
        else
          select(method, values, options, html_options)
        end
      end

      field_helper(method, field, html_options)
    end

    def anchor_button(action, target, text, style = nil)
      data = { action: action, 'slim-select-target': target }
      tag.a text, class: 'button is-small', style: style, data: data
    end

    def slim_select_field_options(method, html_options, options)
      {
        id: "#{method}_select_div",
        class: "slim-select #{html_options.delete(:select_class)}".strip,
        'data-controller': 'slim-select',
        'data-slim-select-close-on-select-value': options[:close_on_select],
        'data-slim-select-allow-deselect-option-value': options[:allow_deselect_option],
        'data-slim-select-placeholder-value': html_options[:placeholder],
        'data-slim-select-add-items-value': options[:add_items],
        'data-slim-select-show-content-value': options[:show_content],
        'data-slim-select-show-search-value': options[:show_search],
        'data-slim-select-search-placeholder-value': options[:search_placeholder],
        'data-slim-select-add-to-body-value': options[:add_to_body],
        'data-slim-select-select-all-text-value': options[:select_all_text],
        'data-slim-select-deselect-all-text-value': options[:deselect_all_text]
      }
    end

    def boolean_field(method, options = {}, checked_value = '1', unchecked_value = '0')
      label_text = options.delete(:label) || translate_attribute(method)

      label(method, options.delete(:label_options) || {}) do
        safe_join([check_box(method, options, checked_value, unchecked_value), label_text], ' ')
      end
    end

    def radio_field(method, values, options = {}, html_options = {})
      field_name = [object.model_name.singular, method].join('_')
      data = html_options.delete(:data)
      label_class = class_names(['radio', html_options.delete(:radio_label_class)])

      tags = values.map do |display_value|
        display, value, radio_options = display_value
        radio_options ||= {}
        radio_options.merge!(html_options)

        label(method, class: label_class, for: [field_name, value].join('_')) do
          radio_button(method, value, radio_options.merge(data: data)) + display
        end
      end

      field = @template.safe_join(tags)
      field_helper(method, field, options)
    end

    def time_zone_select(method, priority_zones = nil, options = {}, html_options = {})
      select_class = field_class_name(method, "select #{html_options.delete(:select_class)}")

      field = content_tag(:div, class: select_class) do
        super(method, priority_zones, options, field_options(method, html_options))
      end

      field_helper(method, field, options)
    end

    def submit(value, options = {})
      options.with_defaults!(
        wrapper_class: 'inline',
        data: {},
        type: 'submit',
        class: 'button is-primary'
      )

      options = prepend_action(options, 'modal#submit') if options.delete(:modal)

      options = prepend_action(options, 'drawer#submit') if options.delete(:drawer)

      content_tag(:div, class: options.delete(:wrapper_class)) do
        content_tag(:button, value, options)
      end
    end

    # TODO: Fix these lint warning
    #
    # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    #
    def submit_actions(value, options = {})
      cancel_path = options.delete(:cancel_path) || ''
      cancel_options = options.delete(:cancel_options) || {}

      field_data = options.delete(:field_data)
      field_id = options.delete(:field_id)
      field_class = options.delete(:field_class) || 'field is-grouped is-grouped-right'

      cancel_options = prepend_action(cancel_options, 'modal#close') if options[:modal]

      cancel_options = prepend_action(cancel_options, 'drawer#close') if options[:drawer]

      @template.content_tag(:div, id: field_id, class: field_class, data: field_data) do
        submit = @template.content_tag(:div, class: 'control') do
          submit(value, options)
        end

        if cancel_path.present? || cancel_options.present?
          cancel_label = cancel_options.delete(:label) || I18n.t(:cancel, default: 'Cancel')
          cancel_options.with_defaults!(class: 'button is-secondary')
          cancel = @template.content_tag(:div, class: 'control') do
            @template.link_to(cancel_label, cancel_path, cancel_options)
          end

          cancel + submit
        else
          submit
        end
      end
    end
    # rubocop:enable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
  end
end
# rubocop:enable Metrics/ModuleLength

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
        class: 'field has-addons',
        data: { controller: 'datepicker' }
      }.merge!(options.delete(:wrapper_options) || {})

      content_tag(:div, wrapper_options) do
        text_field(method, options) + clear_btn
      end
    end

    def datetime_field(method, options = {})
      options[:wrapper_options] = { 'data-datepicker-enable-time': true }
      date_field(method, options)
    end

    def time_field(method, options = {})
      options[:wrapper_options] = {
        'data-datepicker-enable-time': true,
        'data-datepicker-no-calendar': true
      }
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
          @template.link_to '-', '', class: button_class, disabled: disabled,
                                     data: disabled ? {} : subtract_button_data
        end

        input = @template.content_tag(:div, class: 'control') do
          number_field(method, options)
        end

        addon_right = @template.content_tag(:div, class: 'control') do
          @template.link_to '+', '', class: button_class, disabled: disabled,
                                     data: disabled ? {} : add_button_data
        end

        @template.safe_join([addon_left, input, addon_right])
      end
    end

    def phone_field(method, options = {})
      options[:data] ||= {}
      options[:data][:controller] = 'phone-input'

      field_helper(method, super(method, field_options(method, options)), options)
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

    # Uses the Choices.js library
    #
    def select_multiple_field(method, values, options = {}, html_options = {})
      html_options.with_defaults!(multiple: true)

      class_name = "select choices-custom #{html_options.delete(:select_class)}"
      select_class = field_class_name(method, class_name)
      select_data = html_options.delete(:select_data) || {}
      select_id = "#{method}_select_div"

      select_data[:controller] = [select_data[:controller], 'select-field'].compact.join(' ')

      if (position_value = html_options.delete(:dropdown_position))
        select_data['select-field-position'] = position_value
      end

      field = content_tag(:div, id: select_id, class: select_class, data: select_data) do
        select(method, values, options, html_options)
      end

      field_helper(method, field, html_options)
    end

    # Uses the Choices.js library
    #
    def select_single_field(method, values, options = {}, html_options = {})
      html_options[:multiple] = false
      select_multiple_field(method, values, options, html_options)
    end

    # Uses the Stimulus TagsController
    #
    def custom_select_field(method, values, options = {}, html_options = {})
      options.with_defaults!(add_items: true)

      param_key = object.class.model_name.param_key
      field_id = "#{param_key}_#{method}"
      field_name = "#{param_key}[#{method}]"

      container = tag.div(data: { 'tags-target': 'container' })
      input = tag.input(id: field_id, type: 'text', placeholder: html_options[:placeholder],
                        data: { 'tags-target': 'input' })

      tags_data = {
        controller: 'tags',
        'tags-items-value': values,
        'tags-selected-items-value': object.send(method),
        'tags-input-name-value': field_name,
        'tags-add-items-value': options[:add_items]
      }

      field = tag.div(class: 'autocomplete-input-container', data: tags_data) do
        safe_join([
                    tag.div(class: field_class_name(method),
                            data: { 'tags-target': 'fakeInput' }) do
                      safe_join([container, input])
                    end,
                    tag.ul(class: 'results is-hidden', data: { 'tags-target': 'results' })
                  ])
      end

      field_helper(method, field, html_options)
    end

    def boolean_field(method, options = {})
      label_text = options.delete(:label) || translate_attribute(method)

      label(method, options.delete(:label_options) || {}) do
        safe_join([check_box(method, options), label_text], ' ')
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

      if options.delete(:remote_modal)
        options[:data] ||= {}
        options[:data][:action] = ['remote-modal#submit', options[:data][:action]].join(' ')
      end

      content_tag(:div, class: options.delete(:wrapper_class)) do
        content_tag(:button, value, options)
      end
    end

    # TODO: Fix these lint warning
    #
    # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
    #
    def submit_actions(value, options = {})
      cancel_path = options.delete(:cancel_path) || ''
      cancel_options = options.delete(:cancel_options) || {}

      field_data = options.delete(:field_data)
      field_id = options.delete(:field_id)
      field_class = options.delete(:field_class) || 'field is-grouped is-grouped-right'

      if options[:remote_modal]
        cancel_options[:data] ||= {}
        cancel_options[:data][:action] = [
          'remote-modal#close',
          cancel_options[:data][:action]
        ].join(' ')
      end

      if options.delete(:modal)
        cancel_options[:data] ||= {}
        cancel_options[:data][:action] = [
          'click->turbo-stream-modal#close',
          cancel_options[:data][:action]
        ].join(' ')
      end

      @template.content_tag(:div, id: field_id, class: field_class, data: field_data) do
        submit = @template.content_tag(:div, class: 'control') do
          submit(value, options)
        end

        if cancel_path.present? || cancel_options.present?
          cancel_options.with_defaults!(class: 'button is-secondary')
          cancel = @template.content_tag(:div, class: 'control') do
            @template.link_to(I18n.t(:cancel, default: 'Cancel'), cancel_path, cancel_options)
          end

          cancel + submit
        else
          submit
        end
      end
    end
    # rubocop:enable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
  end
end
# rubocop:enable Metrics/ModuleLength

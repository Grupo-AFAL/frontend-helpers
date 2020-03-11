# frozen_string_literal: true

module FrontendHelpers
  module SharedFormBuilderUtils
    include BuilderHtmlUtils

    def label(method, text = nil, options = {}, &block)
      options[:class] = "label #{options[:class]}"
      super(method, text, options, &block)
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

    def submit(value, options = {})
      options.with_defaults!(
        wrapper_class: 'inline',
        data: {},
        type: 'submit',
        class: 'button is-link'
      )

      options[:data][:action] ||= 'submit-button#submit'

      wrapper_options = {
        class: options.delete(:wrapper_class),
        data: { controller: 'submit-button' }
      }

      content_tag(:div, wrapper_options) do
        content_tag(:button, value, options)
      end
    end
  end
end

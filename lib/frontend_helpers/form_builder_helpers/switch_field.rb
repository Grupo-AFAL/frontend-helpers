# frozen_string_literal: true

module FrontendHelpers
  module FormBuilderHelpers
    module SwitchField
      def switch_field_group(method, options = {},
                             checked_value = '1', unchecked_value = '0', &block)
        control_class = options.delete(:control_class)
        label_class = options.delete(:label_class)
        label = if block_given?
                  @template.capture(&block)
                else
                  tag.p(options.delete(:label), class: label_class)
                end

        tag.div(class: "control #{control_class}") do
          safe_join([
                      label,
                      switch_field(method, options, checked_value, unchecked_value)
                    ])
        end
      end

      def switch_field(method, options = {}, checked_value = '1', unchecked_value = '0')
        unique_identifier = timestamp
        options.merge!(id: check_box_id(object, method, unique_identifier))

        @template.content_tag(:div, class: 'field switch') do
          safe_join([
                      check_box(method, options, checked_value, unchecked_value),
                      label("#{method}_#{unique_identifier}") { '&nbsp;'.html_safe }
                    ])
        end
      end

      private

      def timestamp
        Time.now.to_f.to_s.gsub('.', '_')
      end

      def check_box_id(object, method, unique_identifier)
        [object.model_name.singular, method.to_s.singularize, unique_identifier].join('_')
      end
    end
  end
end

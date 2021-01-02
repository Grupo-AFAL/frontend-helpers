# frozen_string_literal: true

module FrontendHelpers
  module BuilderHtmlUtils
    def field_options(method, options)
      pattern_types = {
        number_with_commas: '^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$'
      }

      pattern_type = options.delete(:pattern_type)
      options[:pattern] = pattern_types[pattern_type] if pattern_type

      options[:class] = field_class_name(method, "input #{options[:class]}")
      options
    end

    def field_helper(method, field, options = {})
      if errors?(method)
        help_message = content_tag(:p, full_errors(method), class: 'help is-danger')
      elsif options[:help]
        help_message = content_tag(:p, options[:help], class: 'help')
      end

      div = content_tag(:div, field,
                        class: "control #{options.delete(:control_class)}",
                        data: options.delete(:control_data))
      div + help_message
    end

    def field_class_name(method, class_name = 'input')
      return class_name unless errors?(method)

      "#{class_name} is-danger"
    end

    def errors?(method)
      object.respond_to?(:errors) && object.errors.key?(method)
    end

    def full_errors(method)
      object.errors.full_messages_for(method).join(', ').html_safe
    end

    def content_tag(name, content_or_options_with_block = nil, options = nil, escape = true, &block)
      @template.content_tag(name, content_or_options_with_block, options, escape, &block)
    end

    def translate_attribute(method)
      model_name = object.model_name.singular
      I18n.t("activerecord.attributes.#{model_name}.#{method}", default: method.to_s.humanize)
    end
  end
end

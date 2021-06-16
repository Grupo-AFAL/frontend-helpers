# frozen_string_literal: true

module FrontendHelpers
  class FieldGroupWrapper
    def self.render(template, form, method, options, &block)
      wrapper = new(template, form, method, options)
      wrapper.render(block)
    end

    def initialize(template, form, method, options)
      @template = template
      @form = form
      @method = method
      @options = options

      @label_text = options.delete(:label)
      @addon_left = options.delete(:addon_left)
      @addon_right = options.delete(:addon_right)
      @field_class = options.delete(:field_class)
      @data = options.delete(:field_data)
    end

    def render(block)
      field_id = "field-#{@method}"
      class_name = "field #{@field_class}"

      @template.content_tag(:div, id: field_id, class: class_name, data: @data) do
        @template.safe_join([generate_label_html, inner_field_div(block)].compact)
      end
    end

    private

    def inner_field_div(block)
      return block.call if addon_left.blank? && addon_right.blank?

      @template.content_tag(:div, class: 'field has-addons') do
        @template.safe_join([addon_left, block.call, addon_right].compact)
      end
    end

    def addon_left
      return if @addon_left.blank?

      generate_addon_html(@addon_left)
    end

    def addon_right
      return if @addon_right.blank?

      generate_addon_html(@addon_right)
    end

    def generate_addon_html(addon_content)
      return if addon_content.blank?

      @template.content_tag(:div, class: 'control') do
        addon_content
      end
    end

    def generate_label_html
      @form.label(@method, @label_text) unless @options[:type] == 'hidden' || @label_text == false
    end
  end
end

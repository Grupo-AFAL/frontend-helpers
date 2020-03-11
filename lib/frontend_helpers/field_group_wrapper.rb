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
      @addon_text = options.delete(:addon_text)
      @addon_position = options.delete(:addon_position) || 'left'
      @field_class = options.delete(:field_class)
      @data = options.delete(:field_data)
    end

    def render(block)
      field_id = "field-#{@method}"
      class_name = "field #{@field_class}"
      class_name += ' has-addons' if @addon_text.present?

      @template.content_tag(:div, id: field_id, class: class_name, data: @data) do
        contents = [generate_label_html, addon_left, block.call, addon_right]
        @template.safe_join(contents.compact)
      end
    end

    private

    def addon_left
      return if @addon_position != 'left'

      generate_addon_html
    end

    def addon_right
      return if @addon_position != 'right'

      generate_addon_html
    end

    def generate_addon_html
      return if @addon_text.blank?

      @template.content_tag(:div, class: 'control') do
        @template.content_tag(:a, @addon_text, class: 'button is-static')
      end
    end

    def generate_label_html
      @form.label(@method, @label_text) unless @options[:type] == 'hidden' || @label_text == false
    end
  end
end

# frozen_string_literal: true

module FrontendHelpers
  module Components
    def icon_tag(name, options = {})
      options.merge!(class: "icon #{options[:class]}")

      content_tag(:span, options) do
        content_tag(:i, '', class: "fas fa-#{name}")
      end
    end

    def ellipsis_dropdown(html_options = {})
      html_options.with_defaults!(class: '', data: { controller: 'dropdown' })
      html_options[:class] += ' dropdown is-right'

      content_tag(:div, html_options) do
        trigger = content_tag(:div, class: 'dropdown-trigger') do
          content_tag(:button, class: 'button', data: { action: 'dropdown#toggleMenu' }) do
            content_tag(:i, ''.html_safe, class: 'fas fa-ellipsis-h')
          end
        end

        dropdown = content_tag(:div, class: 'dropdown-menu', role: 'menu') do
          content_tag(:div, class: 'dropdown-content') do
            yield
          end
        end

        trigger + dropdown
      end
    end

    def boolean_icon(value)
      value ? icon_tag('check-circle') : icon_tag('times-circle')
    end
  end
end

# frozen_string_literal: true

module FrontendHelpers
  module Components
    include Utils

    def icon_tag(name, options = {})
      options.merge!(class: "icon #{options[:class]}")

      content_tag(:span, options) do
        content_tag(:i, '', class: "fas fa-#{name}")
      end
    end

    def dropdown(html_options = {}, &block)
      html_options.with_defaults!(class: '', data: { controller: 'dropdown' })
      html_options[:class] += ' dropdown is-right'
      button_class = class_names(['button', html_options.delete(:button_class)])
      button_content = html_options.delete(:button_content) || Icons::ELLIPSIS_SVG.html_safe

      content_tag(:div, html_options) do
        trigger_tag = content_tag(:div, class: 'dropdown-trigger') do
          content_tag(:button, title: 'dropdown-button', class: button_class, data: { action: 'dropdown#toggleMenu' }) do
            button_content
          end
        end

        dropdown_tag = content_tag(:div, class: 'dropdown-menu', role: 'menu') do
          content_tag(:div, class: 'dropdown-content') do
            block.call
          end
        end

        trigger_tag + dropdown_tag
      end
    end

    alias ellipsis_dropdown dropdown

    def boolean_icon(value)
      value ? icon_tag('check-circle') : icon_tag('times-circle')
    end

    def active_link(name, path, options = {})
      path_without_parmms = path.split('?').first

      is_active = case options[:match]
                  when :partial
                    request.path.include?(path)
                  when String
                    request.path.include?(options[:match])
                  when Array
                    options[:match].any? { |p| request.path.include?(p) }
                  else
                    path_without_parmms == request.path
                  end

      options[:class] = class_names(options[:class], 'is-active': is_active)
      link_to name, path, options
    end

    def link_with_icon(name, icon_name, path, options = {})
      icon = icon_tag(icon_name, class: options.delete(:icon_class))

      link_to path, options do
        icon + tag.span(name)
      end
    end
  end
end

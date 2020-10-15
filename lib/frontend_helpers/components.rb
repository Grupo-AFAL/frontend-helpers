# frozen_string_literal: true

module FrontendHelpers
  ELLIPSIS_SVG = %(
    <svg viewBox="0 0 512 512" class="svg-inline--fa fa-ellipsis-h fa-w-16">
      <path fill="currentColor"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8
        0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72
        72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z">
      </path>
    </svg>
  )

  module Components
    def icon_tag(name, options = {})
      options.merge!(class: "icon #{options[:class]}")

      content_tag(:span, options) do
        content_tag(:i, '', class: "fas fa-#{name}")
      end
    end

    def ellipsis_dropdown(html_options = {}, &block)
      html_options.with_defaults!(class: '', data: { controller: 'dropdown' })
      html_options[:class] += ' dropdown is-right'

      content_tag(:div, html_options) do
        trigger = content_tag(:div, class: 'dropdown-trigger') do
          content_tag(:button, class: 'button', data: { action: 'dropdown#toggleMenu' }) do
            ELLIPSIS_SVG.html_safe
          end
        end

        dropdown = content_tag(:div, class: 'dropdown-menu', role: 'menu') do
          content_tag(:div, class: 'dropdown-content') do
            block.call
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

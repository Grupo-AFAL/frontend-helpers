# frozen_string_literal: true

module FrontendHelpers
  module Components
    include Utils
    include IconComponents
    include AutoSubmitSelect

    def icon_tag(name, options = {})
      options[:class] = class_names(['icon', 'icon-component', options[:class]])

      tag.span(**options) do
        icon_svgs(name)
      end
    end

    def dropdown(html_options = {}, &block)
      html_options.with_defaults!(class: '', data: { controller: 'dropdown' })
      html_options[:class] += ' dropdown is-right'
      button_class = class_names(['button', html_options.delete(:button_class)])
      button_content = html_options.delete(:button_content) || icon_svgs('ellipsis-h')

      content_tag(:div, html_options) do
        trigger_tag = content_tag(:div, class: 'dropdown-trigger') do
          content_tag(:button, title: 'dropdown-button', class: button_class,
                               data: { action: 'dropdown#toggleMenu' }) do
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

    def active_li_link(name, path, html_options = {})
      active_li(path, html_options) do
        link_to name, path
      end
    end

    def active_li(path, html_options = {}, &block)
      is_active = active_path?(path, html_options[:match])

      tag.li class: class_names('is-active': is_active) do
        block.call
      end
    end

    # Adds the submit-button stimulus controller so that the Submit button
    # displays a spinner when clicked.
    #
    def form_with(**options, &block)
      options[:data] ||= {}
      options[:data][:controller] = "#{options.dig(:data, :controller)} submit-button".strip

      super(**options, &block)
    end

    def form_for(record, **options, &block)
      options[:data] ||= {}
      options[:data][:controller] = "#{options.dig(:data, :controller)} submit-button".strip

      super(record, **options, &block)
    end
  end
end

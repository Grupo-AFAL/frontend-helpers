# frozen_string_literal: true

module FrontendHelpers
  module Components
    include Utils
    include IconComponents

    def icon_tag(name, options = {})
      options[:class] = class_names(['icon', options[:class]])

      tag.span(options) do
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

    # Convinience method to launch a link within a modal.
    # Appends the data-action="remote-modal#open" to trigger the RemoteModalController
    #
    def link_to_modal(name, options = nil, html_options = nil, &block)
      if block_given?
        html_options = options
        options = name
        name = block
      end
      options ||= {}

      html_options = convert_options_to_data_attributes(options, html_options)

      url = url_for(options)
      html_options['href'] ||= url
      html_options['data-redirect-to'] = request.path
      html_options['data-action'] = 'remote-modal#open'

      content_tag('a', name || url, html_options, &block)
    end

    # Adds the submit-button stimulus controller so that the Submit button
    # displays a spinner when clicked.
    #
    def form_with(**options, &block)
      options[:data] ||= {}
      options[:data][:controller] = "#{options.dig(:data, :controller)} submit-button".strip

      super(**options, &block)
    end
  end
end
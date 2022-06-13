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

    def active_link(name, path = nil, html_options = nil, &block)
      if block_given?
        html_options = path
        path = name
      end

      html_options ||= {}
      is_active = active_path?(path, html_options[:match])

      html_options[:class] = class_names(html_options[:class], 'is-active': is_active)

      if block_given?
        link_to path, html_options do
          block.call
        end
      else
        link_to name, path, html_options
      end
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

    def active_link_with_icon(name, icon_name, path, options = {})
      is_active = active_path?(path, options[:match])
      icon = icon_tag(icon_name, class: options.delete(:icon_class))

      options[:class] = class_names(options[:class], 'is-active': is_active)

      link_to path, options do
        icon + tag.span(name, class: 'name')
      end
    end

    def generate_link_to(name, options, html_options, &block)
      options ||= {}

      html_options = convert_options_to_data_attributes(options, html_options)

      url = url_for(options)
      html_options['href'] ||= url
      html_options['data-redirect-to'] = request.path

      content_tag('a', name || url, html_options, &block)
    end

    # Convinience method to launch a link within a modal.
    # Appends the data-action="modal#open" to trigger the ModalController
    #
    def link_to_modal(name, options = nil, html_options = nil, &block)
      if block_given?
        html_options = options
        options = name
        name = block
      end

      html_options ||= {}
      html_options['data-action'] = 'modal#open'
      generate_link_to(name, options, html_options, &block)
    end

    # Convinience method to launch a link within a drawer.
    # Appends the data-action="drawer#open" to trigger the DrawerController
    #
    def link_to_drawer(name, options = nil, html_options = nil, &block)
      if block_given?
        html_options = options
        options = name
        name = block
      end

      html_options ||= {}
      html_options['data-action'] = 'drawer#open'
      generate_link_to(name, options, html_options, &block)
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

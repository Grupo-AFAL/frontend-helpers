# frozen_string_literal: true

module FrontendHelpers
  module Utils
    def enum_options(enum_hash, path)
      enum_hash.keys.map { |key| [I18n.t("#{path}.#{key}"), key] }
    end

    def class_names(names, conditional_names = {})
      if names.is_a?(Hash)
        conditional_names = names
        classes = []
      else
        classes = Array(names)
      end

      conditional_names.each do |key, condition|
        classes.push(key) if condition
      end
      classes.join(' ').strip
    end

    def current_relative_url
      request.fullpath
    end

    def custom_dom_id(model)
      "#{model.class.name.tableize.singularize.gsub('/', '_')}_#{model.id}"
    end

    def test_id_attr(params)
      return unless params

      test_id = case params
                when ActiveRecord::Base
                  custom_dom_id(params)
                when String
                  params
                end

      "test-id=\"#{test_id}\"".html_safe
    end

    # The last module parent is always "Object", which means the one before to last
    # is the actual module/namespace we want. Like "INV", "Cafeteria" or "EK"
    def app_module
      controller.class.module_parents[-2]
    end

    def active_path?(path, match_option)
      path_without_params = path.split('?').first

      path = path.gsub(/\.html$/, '')
      current_request_path = request.path.gsub(/\.html$/, '')

      case match_option
      when :partial
        current_request_path.include?(path)
      when String
        current_request_path.include?(match_option)
      when Array
        match_option.any? { |p| current_request_path.include?(p) }
      else
        path_without_params == current_request_path
      end
    end

    def append_data_action(hash, value)
      hash ||= {}
      hash[:data] ||= {}
      hash[:data][:action] = [hash.dig(:data, :action), value].join(' ').strip
      hash
    end
  end
end

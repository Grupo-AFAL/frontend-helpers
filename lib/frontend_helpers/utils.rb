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
      classes.join(' ')
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

    def app_module
      controller.class.module_parent
    end
  end
end
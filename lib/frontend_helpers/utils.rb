# frozen_string_literal: true

module FrontendHelpers
  module Utils
    def enum_options(enum_hash, path)
      enum_hash.keys.map { |key| [I18n.t("#{path}.#{key}"), key] }
    end

    def class_names(names, conditional_names = {})
      classes = Array(names)
      conditional_names.each do |key, condition|
        classes.push(key) if condition
      end
      classes.join(' ')
    end

    def current_relative_url
      request.fullpath
    end
  end
end

# frozen_string_literal: true

module FrontendHelpers
  class FormBuilder < ActionView::Helpers::FormBuilder
    include SharedFormBuilderUtils
    include FieldGroupBuilders
    include Utils
  end
end

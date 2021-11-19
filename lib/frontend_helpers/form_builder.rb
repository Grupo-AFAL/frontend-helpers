# frozen_string_literal: true

module FrontendHelpers
  class FormBuilder < ActionView::Helpers::FormBuilder
    include SharedFormBuilderUtils
    include FieldGroupBuilders
    include Utils
    include FormBuilderHelpers::DynamicFields
    include FormBuilderHelpers::SwitchField
  end
end

# frozen_string_literal: true

require 'frontend_helpers/version'
require 'frontend_helpers/utils'
require 'frontend_helpers/icon_components'
require 'frontend_helpers/components'
require 'frontend_helpers/builder_html_utils'
require 'frontend_helpers/shared_form_builder_utils'
require 'frontend_helpers/field_group_wrapper'
require 'frontend_helpers/field_group_builders'
require 'frontend_helpers/filter_form'
require 'frontend_helpers/form_builder_helpers/dynamic_fields'
require 'frontend_helpers/form_builder'
require 'frontend_helpers/layout_concern'
require 'frontend_helpers/custom_redirect_concern'
require 'frontend_helpers/types/time_value'

module FrontendHelpers
  class Engine < ::Rails::Engine; end

  class Error < StandardError; end
end

ActiveSupport.on_load :active_record do
  include FrontendHelpers::Types
end

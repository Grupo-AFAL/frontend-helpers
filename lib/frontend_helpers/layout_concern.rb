# frozen_string_literal: true

# Complements the JavaScript RemoteModalController in order to tell
# Rails that it shouldn't render a layout since the contents of the
# view will be rendered within a Modal.
#
module FrontendHelpers
  module LayoutConcern
    extend ActiveSupport::Concern

    included do
      class_attribute :conditional_layout
      layout :conditionally_skip_layout
    end

    def conditionally_skip_layout
      params[:layout] == 'false' ? false : self.class.conditional_layout
    end
  end
end

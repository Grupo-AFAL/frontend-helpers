# frozen_string_literal: true

module FrontendHelpers
  module CustomRedirectsConcern
    extend ActiveSupport::Concern

    def overridable_redirect_to(path, options = {})
      if params[:redirect_to].present?
        to_uri = URI(params[:redirect_to])

        # Only allow relative paths for the redirect_to parameter to avoid potential
        # security risks of users inserting redirect_to urls to external websites.
        path = to_uri.path
        path += "?#{to_uri.query}" if to_uri.query.present?
      end

      redirect_to path, options
    end
  end
end

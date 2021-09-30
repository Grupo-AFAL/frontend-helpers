# frozen_string_literal: true

module FrontendHelpers
  class FilterForm
    include ActiveModel::Model
    include ActiveModel::Attributes

    attr_reader :scope

    # Ransack attribute for receiving the sort parameters
    attribute :s

    def initialize(scope, params = {})
      @scope = scope
      attributes = params.fetch(:q, {}).permit(permitted_attributes)
      super(attributes)
    end

    def permitted_attributes
      scalar_attributes + array_attributes.map { |a| { a => [] } }
    end

    # To define array attributes the user needs to specify an array as
    # it's default value.
    #
    # e.g.
    # attribute :vendors_id_in, default: []
    #
    def array_attributes
      @array_attributes ||= self.class._default_attributes.keys.filter do |key|
        default_value = self.class._default_attributes[key].value_before_type_cast
        default_value.is_a?(Array)
      end
    end

    def scalar_attributes
      self.class._default_attributes.keys - array_attributes
    end

    def model_name
      @model_name ||= ActiveModel::Name.new(self, nil, 'q')
    end

    def id
      scope.cache_key
    end

    def active_filters_count
      (active_filters.keys & attribute_names).size
    end

    def active_filters?
      active_filters.any?
    end

    def active_filters
      @active_filters || query_params.except('s').filter { |_k, v| v.present? }
    end

    def query_params
      attribute_names.index_with do |attr_name|
        send(attr_name.to_sym)
      end
    end

    def result(options = {})
      @result ||= ransack_search.result(**options)
    end

    def ransack_search
      @ransack_search ||= scope.ransack(query_params)
    end
  end
end

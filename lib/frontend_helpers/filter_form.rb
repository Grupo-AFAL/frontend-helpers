# frozen_string_literal: true

module FrontendHelpers
  class FilterForm
    include ActiveModel::Model
    include ActiveModel::Attributes

    attr_accessor :tenant

    class_attribute :_relationship
    class_attribute :_included_relationships
    class_attribute :_default_order
    class_attribute :_default_scope

    def self.relationship(relationship)
      self._relationship = relationship
    end

    def self.included_relationships(*relationships)
      self._included_relationships = relationships
    end

    def self.default_order(order)
      self._default_order = order
    end

    def self.default_scope(scope)
      self._default_scope = scope
    end

    def initialize(tenant, params = {})
      @tenant = tenant
      attributes = params.fetch(:q, {}).permit(self.class._default_attributes.keys)
      super(attributes)
    end

    def model_name
      @model_name ||= ActiveModel::Name.new(self, nil, 'q')
    end

    def query_params
      attribute_names.index_with do |attr_name|
        send(attr_name.to_sym)
      end
    end

    def result(options = {})
      @result ||= begin
        records = tenant.send(self.class._relationship)

        if self.class._included_relationships.present?
          records = records.includes(self.class._included_relationships)
        end

        records = records.order(self.class._default_order) if self.class._default_order
        records = records.send(self.class._default_scope) if self.class._default_scope

        records.ransack(query_params).result(**options)
      end
    end
  end
end

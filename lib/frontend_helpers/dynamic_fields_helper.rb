# frozen_string_literal: true

module FrontendHelpers
  module DynamicFieldsHelper
    def link_to_add_fields(name, form, association, html_options = {})
      partial = "#{association.to_s.singularize}_fields"

      # When the form.object is a not an ActiveRecord object the nested attributes
      # don't include the sufix "_attributes", so we need to create a new form
      # builder with te original ActiveRecord object to get the same results.
      if form.object.respond_to?(:original_object)
        object = form.object.original_object
        form_builder = Bulma::FormBuilder.new(object.model_name.param_key, object, self, {})
      else
        object = form.object
        form_builder = form
      end

      # Render the form fields from a file with the association name provided
      new_object = object.class.reflect_on_association(association).klass.new
      options = { child_index: 'new_record' }
      fields = form_builder.fields_for(association, new_object, options) do |builder|
        render(partial, f: builder)
      end

      html_options['href'] = '#'
      html_options['data-action'] = 'dynamic-fields#addFields'

      content_tag(:div) do
        content_tag(:a, name, html_options) +
          content_tag(:template, fields, data: { 'dynamic-fields-target': 'template' })
      end
    end

    def link_to_remove_fields(name, form, html_options = {})
      html_options['href'] = '#'

      html_options[:data] ||= {}
      html_options[:data][:action] ||= ''
      html_options[:data][:action] = "dynamic-fields#removeFields #{html_options[:data][:action]}"

      content_tag(:a, name, html_options) +
        form.hidden_field(:_destroy, class: 'destroy-flag')
    end

    def timeago_tag(time)
      data = {
        'data-controller': 'timeago',
        'data-timeago-datetime-value': time,
        'data-timeago-refresh-interval-value': '1000'
      }
      content_tag(:time, time.to_s, data: data) if time
    end
  end
end

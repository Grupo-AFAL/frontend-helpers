# frozen_string_literal: true

module FrontendHelpers
  module FormBuilderHelpers
    module DynamicFields
      # Field helper to add associated records in a form, it generates a label and a link
      # to dynamically add additional associated records.
      #
      #   <%= form_for @product do |f| %>
      #     <%= f.dynamic_fields_group :items,
      #         label: 'Product Items', button_text: 'Add product item' %>
      #     <%= f.submit %>
      #   <% end %>
      #
      # The label and button HTML can be customized by passing a block:
      #
      #   <%= f.dynamic_fields_group :items do %>
      #     <label>Items</label>
      #     <%= f.link_to_add_fields "Add Item", :items %>
      #   <% end %>
      #
      # Requirements:
      # - Partial for the associated fields with the name:
      #     "_#{singluar_association_name}_fields.html.erb"
      # - The template needs to have a top level element with the class:
      #     "#{singluar_association_name}-fields"
      # - Add "accepts_nested_attributes_for :association, allow_destroy: true"
      # - Allow nested attributes in the controller
      #
      # @param method [Symbol] Name of the association
      # @param options [Hash] options to customize the display
      # @option options [String] :label text for the label tag
      # @option options [String] :button_text for the button to add a new associated record
      def dynamic_fields_group(method, options = {}, &block)
        object = self.object
        singular = method.to_s.singularize

        container = tag.div(data: { 'dynamic-fields-target': 'container' }) do
          safe_join(object.send(method).map do |child_object|
            fields_for method, child_object do |nested_builder|
              @template.render "#{singular}_fields", f: nested_builder
            end
          end)
        end

        contents = if block_given?
                     @template.capture(&block)
                   else
                     default_header_contents(method, options)
                   end

        tag.div(
          data: {
            controller: 'dynamic-fields',
            'dynamic-fields-size': object.send(method).size,
            'dynamic-fields-selector': ".#{singular}-fields"
          }
        ) do
          safe_join([contents, container].compact)
        end
      end

      def link_to_add_fields(name, association, html_options = {})
        partial = "#{association.to_s.singularize}_fields"

        # When the form.object is a not an ActiveRecord object the nested attributes
        # don't include the sufix "_attributes", so we need to create a new form
        # builder with the original ActiveRecord object to get the same results.
        if object.respond_to?(:original_object)
          object = self.object.original_object
          form_builder = Bulma::FormBuilder.new(object.model_name.param_key, object, @template, {})
        else
          object = self.object
          form_builder = self
        end

        # Render the form fields from a file with the association name provided
        new_object = object.class.reflect_on_association(association).klass.new
        options = { child_index: 'new_record' }
        fields = form_builder.fields_for(association, new_object, options) do |builder|
          @template.render(partial, f: builder)
        end

        html_options['href'] = '#'
        html_options['data-dynamic-fields-target'] = 'button'
        html_options = append_data_action(html_options, 'dynamic-fields#addFields')

        @template.content_tag(:div, class: html_options.delete(:wrapper_class)) do
          @template.content_tag(:a, name, html_options) +
            @template.content_tag(:template, fields, data: { 'dynamic-fields-target': 'template' })
        end
      end

      def link_to_remove_fields(name, html_options = {})
        html_options['href'] = '#'
        html_options = append_data_action(html_options, 'dynamic-fields#removeFields')

        @template.content_tag(:a, name, html_options) +
          hidden_field(:_destroy, class: 'destroy-flag')
      end

      private

      def default_header_contents(method, options)
        tag.div do
          safe_join([
                      label_tag(method, options),
                      add_link_tag(method, options)
                    ])
        end
      end

      def label_tag(method, options)
        translated_label = I18n.t(
          "activerecord.attributes.#{object.model_name.i18n_key}.#{method}"
        )
        label_text = options[:label] || translated_label

        tag.label(label_text, class: 'label is-pulled-left')
      end

      def add_link_tag(method, options)
        button_text = options[:button_text] || 'Add'

        link_to_add_fields(
          button_text,
          method,
          { class: 'button is-secondary', wrapper_class: 'is-pulled-right' }
        )
      end
    end
  end
end

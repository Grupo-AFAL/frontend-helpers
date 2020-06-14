# frozen_string_literal: true

module FrontendHelpers
  module FieldGroupBuilders
    def text_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        text_field(method, options)
      end
    end

    def email_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        email_field(method, options)
      end
    end

    def password_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        password_field(method, options)
      end
    end

    def text_area_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        text_area(method, options)
      end
    end

    def select_group(method, values, options = {}, html_options = {})
      FieldGroupWrapper.render @template, self, method, options do
        select_field(method, values, options, html_options)
      end
    end

    def select_single_group(method, values, options = {}, html_options = {})
      FieldGroupWrapper.render @template, self, method, options do
        select_single_field(method, values, options, html_options)
      end
    end

    def select_multiple_group(method, values, options = {}, html_options = {})
      FieldGroupWrapper.render @template, self, method, options do
        select_multiple_field(method, values, options, html_options)
      end
    end

    def file_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        file_field(method, options)
      end
    end

    def date_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        date_field(method, options)
      end
    end

    alias date_select_group date_field_group

    def datetime_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        datetime_field(method, options)
      end
    end

    alias datetime_select_group datetime_field_group

    def number_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        number_field(method, options)
      end
    end

    def step_number_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        step_number_field(method, options)
      end
    end

    def currency_field_group(method, options = {})
      options.with_defaults!(
        placeholder: 0,
        addon_text: '$',
        step: '0.01',
        pattern_type: :number_with_commas
      )

      FieldGroupWrapper.render @template, self, method, options do
        text_field(method, options)
      end
    end

    def percentage_field_group(method, options = {})
      options.with_defaults!(
        placeholder: 0,
        addon_text: '%',
        addon_position: 'right',
        step: '0.01',
        pattern_type: :number_with_commas
      )

      FieldGroupWrapper.render @template, self, method, options do
        text_field(method, options)
      end
    end

    def phone_field_group(method, options = {})
      FieldGroupWrapper.render @template, self, method, options do
        phone_field(method, options)
      end
    end

    def boolean_field_group(method, options = {})
      @template.content_tag(:div, class: 'field') do
        boolean_field(method, options)
      end
    end

    alias check_box_group boolean_field_group

    def radio_field_group(method, values, options = {}, html_options = {})
      FieldGroupWrapper.render @template, self, method, options do
        radio_field(method, values, options, html_options)
      end
    end

    def time_zone_select_group(method, priority_zones = nil, options = {}, html_options = {})
      FieldGroupWrapper.render @template, self, method, options do
        time_zone_select(method, priority_zones, options, html_options)
      end
    end
  end
end

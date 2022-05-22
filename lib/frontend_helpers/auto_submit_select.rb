module FrontendHelpers
  module AutoSubmitSelect
    include Utils

    def auto_submit_select(record, attribute, choices, **options)
      options = prepend_controller(options, 'submit-on-change')

      form_with model: record, builder: FrontendHelpers::FormBuilder, **options do |f|
        f.select_field attribute, choices,
                       { show_search: false },
                       { data: { action: 'submit-on-change#submit' } }
      end
    end
  end
end

# frozen_string_literal: true

module FrontendHelpers
  module Types
    class TimeValue < ActiveRecord::Type::String
      def cast(value)
        return '2021-01-01 00:00:00' if value.blank?
        return value if value.is_a?(String)

        hours = value / 3600
        value -= (hours * 3600)

        minutes = value / 60
        value -= (minutes * 60)

        seconds = value

        "2021-01-01 #{format('%<hour>02d', hour: hours)}:"\
                    "#{format('%<mins>02d', mins: minutes)}:"\
                    "#{format('%<sec>02d', sec: seconds)}"
      end

      def serialize(value)
        return value if value.blank? || value.is_a?(Numeric)

        hours, minutes, seconds = value.scan(/\d+:\d+:\d+/)[0].split(':')
        (hours.to_i * 3600) + (minutes.to_i * 60) + seconds.to_i
      end
    end
  end
end
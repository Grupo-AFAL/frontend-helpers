# frozen_string_literal: true

class Workout < ApplicationRecord
  attribute :workout_start_at, TimeValue.new
  attribute :workout_end_at, TimeValue.new

  def serialize_object(value)
    TimeValue.new.serialize(value)
  end
end

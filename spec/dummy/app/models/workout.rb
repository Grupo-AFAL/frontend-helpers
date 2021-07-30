# frozen_string_literal: true

class Workout < ApplicationRecord
  attribute :workout_start_at, TimeValue.new
  attribute :workout_end_at, TimeValue.new
end

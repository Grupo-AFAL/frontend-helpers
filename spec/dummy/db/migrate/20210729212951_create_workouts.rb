# frozen_string_literal: true

class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.integer :workout_start_at
      t.integer :workout_end_at

      t.timestamps
    end
  end
end

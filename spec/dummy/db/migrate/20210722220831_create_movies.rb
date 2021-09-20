# frozen_string_literal: true

class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :genre
      t.integer :status, default: 0
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end
  end
end

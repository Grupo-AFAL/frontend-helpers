# frozen_string_literal: true

class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end
  end
end

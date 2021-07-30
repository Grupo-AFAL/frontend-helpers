# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_210_729_212_951) do
  create_table 'characters', force: :cascade do |t|
    t.string 'name'
    t.integer 'movie_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['movie_id'], name: 'index_characters_on_movie_id'
  end

  create_table 'movies', force: :cascade do |t|
    t.string 'name'
    t.integer 'status', default: 0
    t.integer 'tenant_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['tenant_id'], name: 'index_movies_on_tenant_id'
  end

  create_table 'othermodels', force: :cascade do |t|
    t.integer 'address_id'
    t.index ['address_id'], name: 'index_othermodels_on_address_id'
  end

  create_table 'tenants', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'workout', force: :cascade do |t|
    t.integer 'workout_end_at'
    t.integer 'workout_start_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'workouts', force: :cascade do |t|
    t.integer 'workout_start_at'
    t.integer 'workout_end_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  add_foreign_key 'characters', 'movies'
  add_foreign_key 'movies', 'tenants'
end

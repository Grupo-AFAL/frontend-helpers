# frozen_string_literal: true

class Movie < ApplicationRecord
  belongs_to :tenant
  has_many :characters

  scope :active, -> { where(status: 0) }
end

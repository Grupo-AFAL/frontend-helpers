# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :movies
end

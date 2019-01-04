class Coin < ApplicationRecord
  belongs_to :user, optional: true
end

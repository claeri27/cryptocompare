class CreateCoins < ActiveRecord::Migration[5.2]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :symbol
      t.string :current_price
      t.string :volume_24h
      t.string :market_cap
      t.string :percent_change_1h
      t.string :percent_change_24h
      t.string :percent_change_7d
      t.string :cmc_rank
      t.string :page

      t.timestamps
    end
  end
end

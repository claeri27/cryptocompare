class ChangeCmcRankToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :coins, :cmc_rank, :bigint, using: 'cmc_rank::bigint'
    change_column :coins, :volume_24h, :bigint, using: 'volume_24h::bigint'
    change_column :coins, :percent_change_1h, :real, using: 'percent_change_1h::real'
    change_column :coins, :percent_change_7d, :real, using: 'percent_change_7d::real'
    change_column :coins, :percent_change_24h, :real, using: 'percent_change_24h::real'
    change_column :coins, :market_cap, :bigint, using: 'market_cap::bigint'
    change_column :coins, :current_price, :real, using: 'current_price::real'
  end
end

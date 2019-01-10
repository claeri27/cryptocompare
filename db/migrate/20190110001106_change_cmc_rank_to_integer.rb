class ChangeCmcRankToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :coins, :cmc_rank, :bigint, using: 'cmc_rank::bigint'
    change_column :coins, :volume_24h, :bigint, using: 'volume_24h::bigint'
    change_column :coins, :percent_change_1h, :string
    change_column :coins, :percent_change_7d, :string
    change_column :coins, :percent_change_24h, :string
    change_column :coins, :market_cap, :bigint, using: 'market_cap::bigint'
  end
end

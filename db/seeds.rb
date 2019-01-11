# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  {
    username: 'bilbo',
    email: 'bilbo@shire.gov',
    password: 'bilbo'
  }, {
    username: 'admin',
    email: 'admin',
    password: 'admin'
  }
])

Coin.destroy_all

resp = RestClient.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=1000&CMC_PRO_API_KEY=#{ENV["API_KEY"]}")
json = JSON.parse(resp)["data"]
# p json
json.map { |coin| Coin.create([{
  name: coin["name"],
  symbol: coin["symbol"],
  current_price: coin["quote"]["USD"]["price"],
  volume_24h: coin["quote"]["USD"]["volume_24h"],
  percent_change_1h: coin["quote"]["USD"]["percent_change_1h"],
  percent_change_24h: coin["quote"]["USD"]["percent_change_24h"],
  percent_change_7d: coin["quote"]["USD"]["percent_change_7d"],
  market_cap: coin["quote"]["USD"]["market_cap"],
  cmc_rank: coin["cmc_rank"],
  page: ((coin["cmc_rank"] - 1)/50).floor
}])}

p Coin.all

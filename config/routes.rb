Rails.application.routes.draw do
  scope '/api' do
  root 'home#index'
  post 'user_token' => 'user_token#create'
  resources :coins
  resources :users

  post 'register', to: 'users#create', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  post 'next', to: 'coins#next', as: 'next'
  post 'previous', to: 'coins#previous', as: 'previous'

  get 'rank', to: 'coins#rank', as: 'rank'
  get 'rank_down', to: 'coins#rank_down', as: 'rank_down'
  get 'name', to: 'coins#name', as: 'name'
  get 'name_down', to: 'coins#name_down', as: 'name_down'
  get 'symbol', to: 'coins#symbol', as: 'symbol'
  get 'symbol_down', to: 'coins#symbol_down', as: 'symbol_down'
  get 'volume', to: 'coins#volume', as: 'volume'
  get 'volume_down', to: 'coins#volume_down', as: 'volume_down'
  get 'market_cap', to: 'coins#market_cap', as: 'market_cap'
  get 'market_cap_down', to: 'coins#market_cap_down', as: 'market_cap_down'
  get 'percent_change_1h', to: 'coins#percent_change_1h', as: 'percent_change_1h'
  get 'percent_change_1h_down', to: 'coins#percent_change_1h_down', as: 'percent_change_1h_down'
  get 'percent_change_24h', to: 'coins#percent_change_24h', as: 'percent_change_24h'
  get 'percent_change_24h_down', to: 'coins#percent_change_24h_down', as: 'percent_change_24h_down'
  get 'percent_change_7d', to: 'coins#percent_change_7d', as: 'percent_change_7d'
  get 'percent_change_7d_down', to: 'coins#percent_change_7d_down', as: 'percent_change_7d_down'
  get 'current_price', to: 'coins#current_price', as: 'current_price'
  get 'current_price_down', to: 'coins#current_price_down', as: 'current_price_down'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
end

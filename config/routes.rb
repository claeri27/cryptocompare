Rails.application.routes.draw do
  root 'home#index'
  post 'user_token' => 'user_token#create'
  resources :coins
  resources :users

  post 'register', to: 'users#create', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

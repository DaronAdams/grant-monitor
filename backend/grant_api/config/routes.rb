Rails.application.routes.draw do
  post '/register', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/check_auth', to: 'sessions#check_auth'
end

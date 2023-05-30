Rails.application.routes.draw do
  
  resources :invoices, only: [:create, :update, :destroy]
  resources :clients, except: :show 
  resources :users, only: [:create, :show]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  get "/invoices/highest", to: "invoices#highest"



  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end


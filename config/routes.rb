Rails.application.routes.draw do
  
  resources :invoices, only: [:create, :update, :destroy]
  resources :clients, except: :show 
  resources :users, only: [:create, :show]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end



# Create a custom route that grabs all the invoices above a number n that is sent as a parameter. The invoices that are greater than this amount should then lead to all the clients who are connected to those invoices. Render json of the clients (a unique list) who are associated with the invoices that met the requirement.


# Submit a form with number
# If an invoice's cost is higher than the number, return the client name
# Returning a unique list of all of the clients who fit that parameter of an invoice above X.
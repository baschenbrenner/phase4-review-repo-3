class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response


private 

def render_unprocessable_entity_response
  render json: { error: "The entity aint processable my boi" }, status: :unprocessable_entity
end

def render_not_found_response
  render json: { error: "Not Found" }, status: :not_found
end

end

class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

def authorize
  # @user = User.find(session[:user_id])
  return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
end

private 

def render_unprocessable_entity_response e
  render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
end

def render_not_found_response
  render json: { error: "Not Found" }, status: :not_found
end



end

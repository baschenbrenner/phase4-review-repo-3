class UsersController < ApplicationController
    before_action :authorize

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end

end

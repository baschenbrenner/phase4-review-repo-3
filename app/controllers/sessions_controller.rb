class SessionsController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        if params[:password] == user.password
            session[:user_id] = user.id 
            render json: user 
        else 
            render json: { error: "Invalid Username or Password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end

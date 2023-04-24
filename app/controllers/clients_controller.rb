class ClientsController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        clients = Client.all
        render json: clients, status: :ok
    end

    def create
        client = Client.create!(client_params)
        render json: client, status: :created
    end

    def update
        client = Client.find(params[:id])
        client.update!(client_params)
        render json: client, status: :accepted
    end

    def destroy
        Client.find(params[:id]).destroy
        head :no_content
    end

    private
    def client_params
        params.permit(:name, :point_of_contact, :poc_email)
    end

end

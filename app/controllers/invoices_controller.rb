class InvoicesController < ApplicationController
    before_action :authorize_user, only: [:update, :destroy]
    skip_before_action :authorize

    def create
        user = User.find(session[:user_id])
        invoice = user.invoices.create!(invoice_params)
        render json: invoice, status: :created
    end

    def update
        @invoice.update!(invoice_params)
        render json: @invoice, status: :accepted
    end

    def destroy 
        @invoice.destroy
        head :no_content
    end
  

    private
    def invoice_params
        params.permit(
            :cost, 
            :date_invoice_paid, 
            :date_invoice_sent, 
            :date_payment_due, 
            :date_service_completed,
            :client_id,
            # :user_id,
            :service_description 
        )
    end

    def authorize_user
        @user_id = session[:user_id]
        @invoice = Invoice.find(params[:id])
        return render json: { error: "You are not authorized to edit or delete this invoice" }, status: :unauthorized unless @invoice.user_id == @user_id
    end

end

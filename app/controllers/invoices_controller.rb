class InvoicesController < ApplicationController
    before_action :authorize

    def create
        invoice = Invoice.create!(invoice_params)
        render json: invoice, status: :created
    end

    def update
        invoice = Invoice.find(params[:id])
        invoice.update!(invoice_params)
        render json: invoice, status: :accepted
    end

    def destroy 
       Invoice.find(params[:id]).destroy
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
            :user_id,
            :service_description 
        )
    end

end

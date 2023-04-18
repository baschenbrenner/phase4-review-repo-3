class InvoicesController < ApplicationController

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

    def special 
        byebug
        @client_id_arr = []
        invoices = Invoice.all
        new_arr = invoices.select{|inv| inv.cost > num}
        new_arr.each {|inv| elem.client_id << @client_id_arr}
        @client_id_arr.uniq 

    end
    # [1,2,3,4,5].select {|num| num.even? }     #=> [2, 4]

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
            :service_description )
    end

end

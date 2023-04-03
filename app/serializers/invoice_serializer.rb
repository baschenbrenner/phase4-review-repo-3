class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :cost, :date_invoice_sent, :date_invoice_paid, :date_service_completed, :client_id, :user_id, :service_description
end

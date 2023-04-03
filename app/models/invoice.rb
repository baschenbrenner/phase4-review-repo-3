class Invoice < ApplicationRecord
    belongs_to :client
    belongs_to :user 
    
    validates :service_description, presence: true
    validates :cost, presence: true
    # Include a minimum number for validations
    validates :date_invoice_sent, presence: true
    validates :date_payment_due, presence: true
end

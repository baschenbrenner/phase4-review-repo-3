class Invoice < ApplicationRecord
    belongs_to :client
    belongs_to :user 
    
    validates :service_description, presence: true
    validates :cost, presence: true
    validates :date_invoice_sent, presence: true
end

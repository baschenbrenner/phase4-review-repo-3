class User < ApplicationRecord
    has_many :invoices
    has_many :clients, through: :invoices 
    
end

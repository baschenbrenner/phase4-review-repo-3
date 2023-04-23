class User < ApplicationRecord
    has_many :invoices
    has_many :clients, through: :invoices 
    
    has_secure_password
    
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :email, uniqueness: true
    validates :email, presence: true
end

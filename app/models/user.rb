class User < ApplicationRecord
    has_many :invoices
    has_many :clients, through: :invoices 
    
    has_secure_password
    validates :username, presence: true
    # validates :password, presence: true
    validates :email, presence: true
    # INcluce email validations
end

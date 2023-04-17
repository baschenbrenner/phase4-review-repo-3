class Client < ApplicationRecord
    has_many :invoices
    has_many :users, through: :invoices

    validates :name, presence: true
    validates :point_of_contact, presence: true
    validates :poc_email, presence: true
    validates :poc_email, uniqueness: true
end

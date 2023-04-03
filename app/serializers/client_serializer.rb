class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :point_of_contact, :poc_email
end

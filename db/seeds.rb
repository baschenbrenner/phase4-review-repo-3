require 'faker'
puts 'Seeding 🌱'

10.times do 

User.create(
    username: Faker::Name.first_name, 
    password: "ABC123", 
    email: Faker::Internet.email )

Client.create(
    name:Faker::Company.name, 
    point_of_contact: Faker::Name.name, 
    poc_email: Faker::Internet.email )

Invoice.create(
    cost: Faker::Invoice.amount_between(from: 100, to: 5000), 
    date_invoice_sent:Faker::Date.backward(days: 365), 
    date_invoice_paid: Faker::Date.forward(days: 365), 
    date_payment_due: Faker::Date.forward(days: 365), 
    date_service_completed:Faker::Date.forward(days: 365), 
    service_description:Faker::Lorem.paragraph, 
    client_id: Faker::Number.between(from: 1, to: 10),
    user_id: Faker::Number.between(from: 1, to: 10))

end


puts 'Seeding complete! ✅'
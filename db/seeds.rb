require 'faker'
puts 'Seeding 🌱'



User.create(
    username: "andrewasmit", 
    password: "ABC123", 
    email: Faker::Internet.email )

User.create(
    username: "test", 
    password: "123", 
    email: Faker::Internet.email )

10.times do 
Client.create(
    name:Faker::Company.name, 
    point_of_contact: Faker::Name.name, 
    poc_email: Faker::Internet.email )
end

15.times do 
Invoice.create( 
    cost: Faker::Invoice.amount_between(from: 100, to: 5000), 
    date_invoice_sent:Faker::Date.backward(days: 365), 
    date_invoice_paid: Faker::Date.forward(days: 365), 
    date_payment_due: Faker::Date.forward(days: 365), 
    date_service_completed:Faker::Date.forward(days: 365), 
    service_description:Faker::Lorem.paragraph, 
    client_id: Faker::Number.between(from: 1, to: 10),
    user_id: Faker::Number.between(from: 1, to: 2) )
end

8.times do 
Invoice.create( 
    cost: Faker::Invoice.amount_between(from: 100, to: 5000), 
    date_invoice_sent:Faker::Date.backward(days: 365), 
    date_invoice_paid: nil, 
    date_payment_due: Faker::Date.forward(days: 365), 
    date_service_completed:Faker::Date.forward(days: 365), 
    service_description:Faker::Lorem.paragraph, 
    client_id: Faker::Number.between(from: 1, to: 10),
    user_id: Faker::Number.between(from: 1, to: 2) )
end


puts 'Seeding complete! ✅'
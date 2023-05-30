require 'faker'
puts 'Seeding 🌱'


counter = 1
while counter < 10
    User.create(
        username: "fakeUser"+counter.to_s, 
        password: "1234", 
        email: Faker::Internet.email 
        )

    counter += 1
end 





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
    user_id: Faker::Number.between(from: 1, to: 9) )
end

15.times do 
Invoice.create( 
    cost: Faker::Invoice.amount_between(from: 100, to: 5000), 
    date_invoice_sent:Faker::Date.backward(days: 365), 
    date_invoice_paid: nil, 
    date_payment_due: Faker::Date.forward(days: 365), 
    date_service_completed:Faker::Date.forward(days: 365), 
    service_description:Faker::Lorem.paragraph, 
    client_id: Faker::Number.between(from: 1, to: 10),
    user_id: Faker::Number.between(from: 1, to: 9) )
end


puts 'Seeding complete! ✅'
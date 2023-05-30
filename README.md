# Freelance

Welcome to the Freelance web application!

This app is built with a React frontend and a Ruby-on-Rails backend. It uses postgresql as the database manager. It was built by Andrew Smit for his phase 4 project. Ben Aschenbrenner forked and cloned it and made some changes and updates to make it a suitable tool for teaching and learning.

This app utilizes a Rails API and a React frontend. It is an interface to better track your client information and payment history. Store you client's contact information and payment history for projects you've completed. Keep track of who has paid what and when. You also can get a great reminder of how many invoices are currently "open" in case you need to send out any reminders on payment due dates. 

## Video Demo

Check out [this video](https://www.youtube.com/watch?v=x9Iei1Yjqng) for a walk-through of Freelance.

## Installation

- Clone this project
- `cd` into the project directory
- Run `bundle`
- Make sure you are not using a postgresql database elsewhere and then run 'rails db:drop db:create db:migrate db:seed'
- Run `npm i && npm start -prefix client`

This will host the app locally and open a browser window to display it. If for some reason the browser doesn't open, but the server started, you can click on the link that appear in the terminal, which should be...

Local:            http://localhost:4000/
On Your Network:  http://192.168.1.5:4000/server

## Usage

- Upon opening the app, you should be directed to a sign-in page. If you do not already have an account, click the "Sign-Up" link to be redirected.

- Once your account is set up, you will be directed to a home page that listed your current total of open invoices. 

-On the invoices page, you get a color-coded table of data that shows which clients have been sent invoices, when they were sent, when (or if) they have been paid, and a description of the service that was provided. These are fully editable to update the description of service or dates of paid invoices. However, if you need to change which client the invoice belongs to, the best practice would be to fully delete the invoice and open a new one.

-On the clients page, you will be greeted with a roladex of all your clients; their contact info, and a short history of the invoices that client has with your freelance business. On this page, you have the ability to fully edit clients as well as add new clients. This is also where new invoices can be created and then associated with the client.
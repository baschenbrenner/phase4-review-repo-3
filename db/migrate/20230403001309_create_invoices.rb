class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.integer :cost
      t.date :date_invoice_sent
      t.date :date_invoice_paid
      t.date :date_service_completed
      t.integer :client_id
      t.integer :user_id
      t.string :service_description

      t.timestamps
    end
  end
end

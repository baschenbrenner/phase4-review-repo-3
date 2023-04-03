class AddDueDateToInvoice < ActiveRecord::Migration[6.1]
  def change
    add_column :invoices, :date_payment_due, :date
  end
end

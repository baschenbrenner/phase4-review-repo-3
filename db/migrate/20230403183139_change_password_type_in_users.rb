class ChangePasswordTypeInUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :password
    add_column :users, :password_digest, :string
  end
end

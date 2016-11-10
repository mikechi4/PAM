CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  user_name varchar(40),
  password varchar(20),
  email varchar(30)
);

CREATE TABLE transactions
(
  transaction_id SERIAL PRIMARY KEY,
  amount decimal(4,2),
  category varchar(10),
  purchase_date date,
  user_id integer REFERENCES Users(user_id)
);

CREATE TABLE budget
(
  budget_id SERIAL PRIMARY KEY,
  user_id integer REFERENCES Users(user_id),
  budget_amt integer
);

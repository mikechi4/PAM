update transactions
set amount=$1, category = $2, purchase_date=$3, name =$4
where transaction_id = $5;

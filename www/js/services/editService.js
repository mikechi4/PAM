angular.module('starter')
.service('editService', function($http) {
  this.getThisTransaction = function(id) {
    return $http({
      method: 'GET',
      url:'http://localhost:3000/edit/?id=' + id,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      }
    })
  }

  this.deleteTransaction = function(id) {
    $http({
      method:'DELETE',
      url:'http://localhost:3000/edit/?id=' + id,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      }
    })
  }

  this.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {
    $http({
      method:'PUT',
      url:'http://localhost:3000/edit',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
      data: {
        transaction_id: id,
        amount: amountSpent,
        category: category,
        purchaseDate: purchaseDate,
        name: name
      }
    })
  }
})

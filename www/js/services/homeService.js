angular.module('starter')
.service('homeService', function($http){
  this.deleteTransaction = function(id) {
    $http({
      method:'DELETE',
      url:'http://localhost:3000/edit/?id=' + id
    })
  }
  this.getGoal = function(){
    return $http({
      method:'GET',
      url:'http://localhost:3000/home/budget'
    })
  }

  this.getTransactions = function(){
    return $http({
      method: 'GET',
      url:'http://localhost:3000/home'
    });
  }

  this.addTransaction = function(name, amountSpent, purchaseDate, category) {
     $http({
      method:'POST',
      url: 'http://localhost:3000/transactions',
      data: {
        amount: amountSpent,
        category: category,
        purchase_date: purchaseDate,
        user_id: 21,
        name: name
      }
    })
  }
})

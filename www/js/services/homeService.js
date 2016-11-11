angular.module('starter')
.service('homeService', function($http){
  var destUrl = 'http://localhost:3000';
  this.deleteTransaction = function(id) {
    $http({
      method:'DELETE',
      url:destUrl + '/edit/?id=' + id,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
    })
  }

  this.getGoal = function(){
    return $http({
      method:'GET',
      url:destUrl + '/home/budget',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      }
    })
  }

  this.getThisTransaction = function(id) {
    return $http({
      method: 'GET',
      url:destUrl + '/edit/?id=' + id,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
    })
  }

  this.getTransactions = function(){
    return $http({
      method: 'GET',
      url:destUrl + '/home',
      headers: {
        'Authorization': 'Bearer ' +  sessionStorage.getItem('myToken')
      }
    });
  }

  this.addTransaction = function(name, amountSpent, purchaseDate, category) {
     $http({
      method:'POST',
      url: destUrl + '/transactions',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
      data: {
        amount: amountSpent,
        category: category,
        purchase_date: purchaseDate,
        user_id: 21,
        name: name
      }
    })
  }

  this.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {

    $http({
      method:'PUT',
      url:destUrl + '/edit',
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

  this.editGoal = function(spendGoal) {
    $http({
      method: 'PUT',
      url: destUrl + '/home/goal',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
      data: {
        spendId: spendGoal.budget_id,
        spendGoal: spendGoal.budget_amt
      }
    })
  }
})

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

  this.getGoal = function(id){
    return $http({
      method:'GET',
      url:destUrl + '/home/budget/?id=' + id,
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

  this.getTransactions = function(id){
    return $http({
      method: 'GET',
      url:destUrl + '/home/?user_id=' + id,
      headers: {
        'Authorization': 'Bearer ' +  sessionStorage.getItem('myToken')
      }
    });
  }

  this.addTransaction = function(name, amountSpent, purchaseDate, category, id) {
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
        user_id: id,
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

  this.editGoal = function(spendGoal,id) {
    console.log('id fro edit goal ' + id);
    $http({
      method: 'PUT',
      url: destUrl + '/home/goal',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
      },
      data: {
        spendId: spendGoal.budget_id,
        spendGoal: spendGoal.budget_amt,
        user_id: id
      }
    })
  }
})

angular.module('starter')
//-------- editCtrl handles addition of modification/deletion of existing transactions -----------
.controller('editCtrl', function($scope, editService, $stateParams){
  var id = $stateParams.id;

  $scope.category="";
  $scope.categories = [
  {
    display: 'Restaurant',
    value: 'Restaurant'
  },
  {
    display: 'Transportation',
    value: 'Transportation'
  },
  {
    display: 'Grocery',
    value: 'Grocery'
  },
  {
    display: 'Travel',
    value: 'Travel'
  },
  {
    display: 'Merchandise',
    value: 'Merchandise'
  },
  {
    display: 'Medical',
    value: 'Medical'
  },
  {
    display: 'Business Service',
    value: 'Business Service'
  },
  {
    display: 'Other',
    value: 'Other'
  }

  ]
  $scope.deleteTransaction = function(id){
    editService.deleteTransaction(id);
  }

  $scope.getThisTransaction = function(id) {
    editService.getThisTransaction(id).then(function(response){
      $scope.data = response.data[0];
      //bind values from service to input values on view
      $scope.name = $scope.data.name;
      $scope.amountSpent = $scope.data.amount;
      $scope.category = $scope.data.category;
      $scope.purchaseDate = $scope.data.purchase_date;
    })
  }
  $scope.getThisTransaction(id);

  $scope.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {
    editService.updateTransaction(id, name, amountSpent, purchaseDate, category);
  }
})

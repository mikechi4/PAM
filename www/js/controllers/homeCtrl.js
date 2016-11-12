angular.module('starter')
//-------- homeController & homeService handles retrieval of transactions-----------
  .controller('homeCtrl', function($scope, $ionicPopup, $http, $state, $stateParams, homeService){
    var date = new Date();
    var id = $stateParams.id;
    console.log('THE ID!!' + id);
    $scope.FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);


    $scope.addTransPopup = function(){
      $scope.entry={}
      var addPopup = $ionicPopup.show({
        templateUrl: '/templates/popup.html',
        title: 'Add a Transaction',
        scope: $scope,
        buttons: [
          {
            text:'Cancel'
          },
          {
            text:'Submit',
            type:'button-positive',
            onTap: function(e) {
              $scope.addTransaction($scope.entry.name, $scope.entry.amountSpent, $scope.entry.purchaseDate, $scope.entry.category, id);
            }
          }
        ]
      })
    }

    $scope.addTransaction = function(name, amountSpent, purchaseDate, category, id){
      homeService.addTransaction(name, amountSpent, purchaseDate, category, id);
    }

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

    $scope.editPopup = function(id) {
      var id = id.id
        homeService.getThisTransaction(id).then(function(response){
          $scope.info = response.data[0];
          //bind values from service to input values on view
          $scope.name = $scope.info.name;
          $scope.amountSpent = $scope.info.amount;
          $scope.category = $scope.info.category;
          $scope.purchaseDate = $scope.info.purchase_date;
        })

        $scope.updateTransaction = function(name, amount, date, category){
          homeService.updateTransaction(id, name, amount, date, category);
          $state.go('tabs.home')
        }

      var editTrans = $ionicPopup.show({
        templateUrl:'/templates/edit.html',
        title: 'Edit/Delete Transaction',
        scope: $scope,
        cssClass: 'popup-vertical-buttons',
        buttons:[
          {
            text: 'Delete',
            type:'button-assertive',
            onTap: function(e){
              $scope.deleteTransaction(id);
            }
          },
          {
            text: 'Cancel'
          }

        ]
      })
    }

    $scope.getTransactions = function(id) {
      var id = $stateParams.id;

      $scope.spendTotal = 0;
      //getTransactions promise handles data from db transactions and
      //handles sum of all transactions to display on home page
      homeService.getTransactions(id).then(function(response) {
        $scope.transactions = response.data;
          //get total of all transactions posted
          for(var i = 0; i < $scope.transactions.length; i++) {
            $scope.spendTotal += ($scope.transactions[i].amount * 1);
          }

        //show the sum of all transactions, rounded to two decimals
        $scope.spendTotal = $scope.spendTotal.toFixed(2);

      })
    }

    $scope.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {
      homeService.updateTransaction(id, name, amountSpent, purchaseDate, category);
    }

    // Used for populating d3Chart
    $scope.getCategories = function(){
      $scope.options = {
        chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          legend: {
              margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
              }
          }
        }
      };

      $scope.data = [];

      homeService.getTransactions(id).then(function(response) {
        var response = response.data;
        for(var i = 0; i < response.length; i++) {
          var ctgObj = {key: response[i].category, y: response[i].amount * 1};
          if($scope.data.length == 0) {
            $scope.data.push(ctgObj);
          } else {
            var flag = false;
            for(var j = 0; j < $scope.data.length; j++){
              if(ctgObj.key == $scope.data[j].key) {
                $scope.data[j].y += ctgObj.y * 1
                flag = true;
              }
            }
            if(!flag){
              $scope.data.push(ctgObj)
            }
          }
        }
      })

    }

    $scope.getGoal = function(){

      homeService.getGoal(id).then(function(response){
        $scope.spendGoal = response.data[0];
        $scope.getPercentage();
      });
    }

    $scope.editGoal = function(spendGoal) {

      homeService.editGoal(spendGoal, id);

    }

    // $scope.getUser = function(){
    //   $http({
    //     method:'GET',
    //     url:'http://localhost:3000/auth/me',
        // headers: {
        //   'Authorization': 'Bearer' + sessionStorage.getItem('myToken')
        // }
    //   }).then(function(response){
    //     $scope.data = response.data
    //     console.log($scope.data);
    //   })
    // }
    // $scope.getUser();
    $scope.getPercentage = function(){
      var percent = ($scope.spendTotal/$scope.spendGoal.budget_amt) * 100;
      $('#bar').css('width', percent + '%');
      $scope.percent = percent;
    }

    $scope.getTransactions();
    $scope.getCategories();
    $scope.getGoal();

    $scope.deleteTransaction = function(id){
      homeService.deleteTransaction(id);
    }

//     $scope.doRefresh = function() {
//       homeService.getGoal(id).then(function(response){
//         $scope.spendGoal = response.data[0];
//         $scope.getPercentage();
//       })
//       .finally(function() {
//   // Stop the ion-refresher from spinning
//   $scope.$broadcast('scroll.refreshComplete');
// });

    $scope.doRefresh = function() {
      $scope.getTransactions();
      $scope.getCategories();
      $scope.getGoal();
      $scope.$broadcast('scroll.refreshComplete');

  }

  })

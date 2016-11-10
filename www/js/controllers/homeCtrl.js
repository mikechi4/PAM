angular.module('starter')
//-------- homeController & homeService handles retrieval of transactions-----------
  .controller('homeCtrl', function($scope, $ionicPopup, $http, homeService){
    var date = new Date();
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
              $scope.addTransaction($scope.entry.name, $scope.entry.amountSpent, $scope.entry.purchaseDate, $scope.entry.category);
            }
          }
        ]
      })
    }

    $scope.addTransaction = function(name, amountSpent, purchaseDate, category){
      homeService.addTransaction(name, amountSpent, purchaseDate, category);
    }

    $scope.getGoal = function(){
      homeService.getGoal().then(function(response){
        $scope.spendGoal = response.data[0].budget_amt;
      });
    }

    $scope.editPopup = function(id) {
      console.log(id);
      $scope.trans={};
      var editTrans = $ionicPopup.show({
        templateUrl:'/templates/edit.html',
        title: 'Edit/Delete Transaction',
        scope: $scope,
        cssClass: 'popup-vertical-buttons',
        buttons:[
          {
            text: 'Cancel'
          },
          {
            text: 'Submit'
          },
          {
            text: 'Delete',
            onTap: function(e){
              $scope.deleteTransaction(id);
            }
          }
        ]
      })
    }

    $scope.getTransactions = function() {
      $scope.spendTotal = 0;
      //getTransactions promise handles data from db transactions and
      //handles sum of all transactions to display on home page
      homeService.getTransactions().then(function(response) {
        $scope.transactions = response.data;
          //get total of all transactions posted
          for(var i = 0; i < $scope.transactions.length; i++) {
            $scope.spendTotal += ($scope.transactions[i].amount * 1);
          }

        //show the sum of all transactions, rounded to two decimals
        $scope.spendTotal = $scope.spendTotal.toFixed(2);

      })
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

      homeService.getTransactions().then(function(response) {
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

    // $scope.getUser = function(){
    //   $http({
    //     method:'GET',
    //     url:'http://localhost:3000/auth/me',
    //     headers: {
    //       'Authorization': sessionStorage.getItem('myToken')
    //     }
    //   }).then(function(response){
    //     $scope.data = response.data
    //     console.log($scope.data);
    //   })
    // }
    // // $scope.getUser();
    $scope.getGoal();
    $scope.getTransactions();
    $scope.getCategories();

    $scope.deleteTransaction = function(id){
      homeService.deleteTransaction(id);
    }
  })

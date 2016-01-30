angular.module('app.controllers', ['ngAnimate'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.itemData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Create the addItem modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addItem.html', {
    scope: $scope
  }).then(function(addItemModal) {
    $scope.addItemModal = addItemModal;
  });
  // Triggered in the addItem modal to close it
  $scope.closeAddItem = function() {
    $scope.addItemModal.hide();
  };
  // Open the AddItem modal
  $scope.openAddItem = function() {
    $scope.addItemModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.itemData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.factory("ItemsArray", function($firebaseArray) {
  var itemsRef = new Firebase("https://90DaysApp.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.controller('homeCtrl', function($scope, ItemsArray, $firebaseObject, $firebaseArray) {
  // Get a reference to our Items
  var ref = new Firebase("https://90DaysApp.firebaseio.com/items");
  // Retrieve new posts as they are added to our database
  ref.on("value", function(getObject, prevChildKey) {
    var getData = getObject.val();
     
    // Set Data value's to a variable for inAppBrowser to Understand  
    var foodUrl = getData.Food;
    var smoothieUrl = getData.Smoothie;
      
      $scope.openFoodUrl = function()
        {
         // Open in app browser
         window.open(foodUrl,'_blank');
        };

        $scope.openSmoothieUrl = function()
        {
         // Open in app browser
         window.open(smoothieUrl,'_blank');
        };
  });

  $scope.items = [
    { title: 'Smoothie of The Day', id: 1, link: "Smoothie" },
    { title: 'Food of The Day', id: 2, link: "Food" },
    { title: 'Workout of The Day', id: 3, link: "Workout" },
    { title: 'Join Me!', id: 4, link: "JoinMe" },
  ];
})

 .controller("itemCtrl", function($scope) {
   var itemsRef = new Firebase("https://90DaysApp.firebaseio.com/items");

    $scope.addItem = function() {
      if ($scope.itemData.smoothie) {
        itemsRef.update({Smoothie: $scope.itemData.smoothie})
      }
      if ($scope.itemData.food){
        itemsRef.update({Food: $scope.itemData.food})
      }
      $scope.closeAddItem();
    };
  })


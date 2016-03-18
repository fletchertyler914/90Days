angular.module('app.controllers', ['ngAnimate'])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {

    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
      if (authData) {
        //console.log("User " + authData.uid + " is logged in with " + authData.provider);
        // Assign a scope variable to the authinticated user
        $rootScope.authDataUid = authData.uid;
        $rootScope.SignedIn = true;

      } else {
        //console.log("User is logged out");
        $rootScope.SignedIn = false;
      }
    }

    // Register the callback to be fired every time auth state changes
    var ref = new Firebase("https://90daysapp.firebaseio.com");
    ref.onAuth(authDataCallback);


  // Form data for the login modal
  $scope.itemData = {};
  $scope.loginData = {};
  //$scope.signupData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('www/templates/login.html', {
    scope: $scope
  }).then(function(loginModal) {
    $scope.loginModal = loginModal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };
  // Open the login modal
  $scope.openLogin = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var ref = new Firebase("https://90daysapp.firebaseio.com");
    ref.authWithPassword({
      email    : $scope.loginData.username,
      password : $scope.loginData.password
    }, function(error, authData) {
      if (authData) {
        console.log("Successfully logged in with uid:", authData.uid);
          $scope.closeLogin();
      } else {
        console.log("Error Logging In: ", error);
        alert("Error: ", error);
      }
    });
  };

// Create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('www/templates/signup.html', {
    scope: $scope
  }).then(function(signupModal) {
    $scope.signupModal = signupModal;
  });
  // Triggered in the signup modal to close it
  $scope.closeSignup = function() {
    $scope.signupModal.hide();
  };
  // Open the signup modal
  $scope.openSignup = function() {
    $scope.signupModal.show();
  };

  // Perform the signup action when the user submits the signup form
  $scope.doSignup = function() {
    var ref = new Firebase("https://90daysapp.firebaseio.com");
    ref.createUser({
      email    : $scope.signupData.username,
      password : $scope.signupData.password
    }, function(error, userData) {
      if (userData) {
        //console.log("Successfully created user account with uid:", userData.uid);
          $scope.closeSignup();
      } else {
        //console.log("Error Signing Up: ", error);
        alert("Error: ", error);
      }
    });
  };

    $scope.signout = function(){
        ref.unauth();
    };

  // Create the addItem modal that we will use later
  $ionicModal.fromTemplateUrl('www/templates/addItem.html', {
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

}) // End App Ctrl

// Possibly needed?
.factory("ItemsArray", function($firebaseArray) {
  var itemsRef = new Firebase("https://90DaysApp.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.controller('homeCtrl', function($scope, ItemsArray, $firebaseObject, $firebaseArray) {
    if(window.navigator.standalone == true) {
  // My app is installed and therefore fullscreen
        //alert("test");
}

  // Get a reference to our Items
  var ref = new Firebase("https://90DaysApp.firebaseio.com/items");
  // Retrieve new posts as they are added to our database
  ref.on("value", function(getObject, prevChildKey) {
    var getData = getObject.val();

    // Set Data value's to a variable for inAppBrowser to Understand
    var foodUrl = getData.Food;
    var smoothieUrl = getData.Smoothie;
    var workoutUrl = getData.Workout;

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

      $scope.openWorkoutUrl = function()
        {
         // Open in app browser
         window.open(workoutUrl,'_blank');
        };
  });

  $scope.items = [
    { title: 'Smoothie of The Day: ', id: 1, link: "Smoothie", image: "https://dl.dropboxusercontent.com/u/20609233/90days/www/img/blender.png"},
    { title: 'Food of The Day: ', id: 2, link: "Food", image: "https://dl.dropboxusercontent.com/u/20609233/90days/www/img/food.png" },
    { title: 'Workout of The Day: ', id: 3, link: "Workout", image: "https://dl.dropboxusercontent.com/u/20609233/90days/www/img/barbell.png"},
//    { title: 'Join Me!', id: 4, link: "JoinMe" },
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
      if ($scope.itemData.workout){
        itemsRef.update({Workout: $scope.itemData.workout})
      }
      $scope.closeAddItem();
    };
  })


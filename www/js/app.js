// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('newsApp', ['ionic'])

app.controller('newsController',function($scope,$http,$location,$window){
$scope.news = [];

  $http({
    method:'GET',
    url:'https://getnewsfromsomeone.000webhostapp.com/index.php'
  }).then(function(newsData){
    console.log(newsData);

    console.log(newsData.data[0]);
      angular.forEach(newsData.data[0],function(newsArticle){
        $scope.news.push(newsArticle);
      });
      $scope.lastarticleID = newsData.data.lastID;

  //  $scope.news = newsData.data[0];
      console.log($scope.news);


  });

  $scope.loadMore = function() {
    var parameters = {
        //id;
        id:$scope.lastarticleID

    };



   $http.get('https://getnewsfromsomeone.000webhostapp.com/index.php',{params:parameters}).success(function(items) {
       $scope.lastarticleID = items.lastID;
       angular.forEach(items,function(item){
         $scope.news.push(items);
       });
     $scope.$broadcast('scroll.infiniteScrollComplete');

   });
 };

 $scope.$on('$stateChangeSuccess', function() {
   $scope.loadMore();
 });



  $scope.lookUp = function($event,newsArticle){
        console.log($event);
        $scope.url = "http://www.google.com/search?q="+$event.srcElement.innerText;
      $window.location.href = $scope.url;



  };


  $scope.doRefresh = function() {
    $scope.news=[];

    $http({
      method:'GET',
      url:'https://getnewsfromsomeone.000webhostapp.com/index.php'
    }).then(function(newsData){
      console.log(newsData);

      console.log(newsData.data[0]);
        angular.forEach(newsData.data[0],function(newsArticle){
          $scope.news.push(newsArticle);
        })
})
    .finally(function() {
      // Stop the ion-refresher from spinning
        $scope.lastarticleID = newsData.data.lastID;
      $scope.$broadcast('scroll.refreshComplete');
    });
 };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

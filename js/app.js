// JavaScript Document

var app = angular.module('dealerShip', ['ngRoute', 'google-maps']);

app.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'cars.html',
	controller: 'carsCtrl'
  	})
   .when('/car/:index', {
    templateUrl: 'car.html',
    controller: 'carCtrl'
  	})
   .when('/edit/:index', {
    templateUrl: 'edit.html',
    controller: 'editCtrl'
  	})
   .when('/add', {
    templateUrl: 'edit.html',
    controller: 'addCtrl'
  	})
   .when('/delete/:index', {
    templateUrl: 'edit.html',
    controller: 'deleteCtrl'
  	})
  .otherwise({ redirectTo: '/'});
  
});

app.factory('cars', function($http){
	function getData(callback){
		$http({
			method: 'GET',
			url: './db/cars.json',
			cache: true
		}).success(callback);
	}
	return {
		list: getData
	};
});


app.controller('geoCtrl', function($scope, $window) {
	
	$window.navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		$scope.$apply(function() {
			$scope.lat = lat;
			$scope.lng = lng;
		});
		
});	

});

app.controller('mainCtrl', function($scope, cars) {
		
	cars.list(function(cars){
	$scope.cars = cars;
	});
		
	/* $scope.map = {
	    center: {
	        latitude: 42.701139999999995,
	        longitude: 23.286661799999997
	    },
	    zoom: 12
	};
	*/

});


app.controller('carsCtrl', function($scope, cars, $routeParams) {
	$scope.car = $scope.cars;

	$scope.map = {
	    center: {
	        latitude: 42.701139999999995,
	        longitude: 23.286661799999997
	    },
	    zoom: 12
	};


	
	//var arr = [];
	//var latLen = $scope.cars.length;
	//$scope.latitude = $scope.cars.lat;
	//$scope.longitude = $scope.cars.lng;
	//console.log($scope.latitude.value[1]);

	//for (var i in $scope.car) {
	  //console.log($scope.car.lat[i]); //"aa", bb", "cc"
	//}


	/* for (var i = 0; i < latLen; i++) {
	    arr.push({
	        latitude: $scope.latitude[i],
	        longitude: $scope.longitude[i]
	    });
	} */

	var car = $scope.cars

	//console.log(car);

	$scope.markersList = {
		latitude: $scope.cars.lat,
		longitude: $scope.cars.lng
	};
	
});

app.controller('carCtrl', function($scope, $routeParams, cars) {
	$scope.car = $scope.cars[$routeParams.index];
	$scope.index = $routeParams.index;

	$scope.map = {
	    center: {
	        latitude: $scope.car.lat,
	        longitude: $scope.car.lng
	    },
	    zoom: 12
	};

	$scope.marker = {latitude: $scope.car.lat, longitude: $scope.car.lng};
	$scope.idKey = $scope.index;
});



app.controller('editCtrl', function($scope, $routeParams) {
	$scope.car = $scope.cars[$routeParams.index];
	$scope.index = $routeParams.index;
});

app.controller('addCtrl', function($scope, $routeParams) {
var lenght = $scope.cars.push({
			image: 'http://lorempixel.com/400/200/transport/3',
            brand: '',
			model: '',
			produce: '',
			instock: '',
			registration: '',
			lat: '',
			lng: ''
		});
		
		$scope.car = $scope.cars[lenght - 1];
		$scope.index = lenght - 1;
});

app.controller('deleteCtrl', function($scope, $routeParams, $location) {	
		$scope.cars.splice($routeParams.index, 1);
		$location.path('/').replace();
});

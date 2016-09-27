angular.module('ignite.findCtrl', [])

.controller('FindCtrl', function($scope, $state, Http) {

	var _mCard = $('#find .card');

	$scope.cards = [];

	$scope.url = 'api/find';

	$scope.init = function() {
		$scope.getUsers();
	}

	$scope.getUsers = function() {
		Http.get($scope.url, $scope.input).then(
			function success(success) {
				$scope.cards = success;
			}
		);
	}

	$scope.cardDestroyed = function(index) {
	  	$scope.cards.splice(index, 1);
	};

	$scope.cardSwiped = function(index) {
	  	// var newCard = { name: 'p3' };
	  	// $scope.cards.push(newCard);
	};

	$scope.cardLeft = function(index) {
		console.log('Reject ' + index);
	};

	$scope.cardRight = function(index) {
		console.log('Accept ' + index);
	};

	$scope.init();

});


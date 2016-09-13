angular.module('ignite.findCtrl', [])

.controller('FindCtrl', function($scope, $state) {
	
	var _mCard = $('#find .card');

	$scope.cards = [
	  	{ name: 'Foo Bar 1' },
	  	{ name: 'Foo Bar 2' }
	];

	$scope.cardDestroyed = function(index) {
	  	$scope.cards.splice(index, 1);
	};

	$scope.cardSwiped = function(index) {
	  	// var newCard = { name: 'p3' };
	  	// $scope.cards.push(newCard);
	};

});


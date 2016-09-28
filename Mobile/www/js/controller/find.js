angular.module('ignite.findCtrl', [])

.controller('FindCtrl', function($scope, $state, Http) {

	var _mCard = $('#find .card');

	$scope.cards = [];

	$scope.url = 'api/find';

	$scope.userId = 1;

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

	$scope.cardLeft = function(index) {
		console.log('Reject');

		var _oUserData = $scope.cards[index];

		_oData = {
			user_id: 1,
			for_user_id: _oUserData.id,
			status: 0
		};

		Http.post($scope.url, _oData).then(
			function success(success) {
				var _sResponse = JSON.parse(success);
				console.log(_sResponse);
				if (_sResponse === false) {
					alert('Relationship is already set.');
				} else {
					alert('Rejected');
				}
			}
		);
	};

	$scope.cardRight = function(index) {
		console.log('Accept');

		var _oUserData = $scope.cards[index];

		_oData = {
			user_id: 1,
			for_user_id: _oUserData.id,
			status: 1
		};

		Http.post($scope.url, _oData).then(
			function success(success) {
				var _sResponse = JSON.parse(success);
				console.log(_sResponse);
				if (_sResponse === false) {
					return alert('Relationship is already set.');
				} else {
					alert('Accepted');
				}
			}
		);
	};

	$scope.init();

});


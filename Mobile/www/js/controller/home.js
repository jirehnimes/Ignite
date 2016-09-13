angular.module('ignite.homeCtrl', [])

.controller('HomeCtrl', function($scope, $state, Http) {
	
	$scope.input = {
		text: ''
	};

	$scope.feeds = [];

	$scope.init = function() {
		$scope.getFeeds();
	}

	$scope.getFeeds = function() {
		Http.get('feed', $scope.input).then(
			function success(success) {
				console.log(success);
				success.forEach(function(mValue, iIndex){
					$scope.feeds.unshift(mValue);
				});
			}
		);
	}

	$scope.postFeed = function() {
		Http.post('feed', $scope.input).then(
			function success(success) {
				console.log(success);
				$scope.input.text = '';
				$scope.feeds.unshift(success);
			}
		);
	}

	$scope.init();

});


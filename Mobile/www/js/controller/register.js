angular.module('ignite.registerCtrl', [])

.controller('RegisterCtrl', function($scope, $state) {

	/**
	 * Go to index page
	 */
	$scope.goIndex = function() {
		$state.go('index');
	}

	/**
	 * Do the register action
	 */
	$scope.doRegister = function() {
		
	}

});


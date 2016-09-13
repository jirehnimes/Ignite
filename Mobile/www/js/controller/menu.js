angular.module('ignite.menuCtrl', [])

.controller('MenuCtrl', function($scope, $state, $window) {
	
	$scope.goToFind = function() {
		// $window.location.reload();
		$state.go('menu.find');
	}

	$scope.doLogout = function() {
		$state.go('index');
	}

});


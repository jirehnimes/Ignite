angular.module('ignite.indexCtrl', [])

.controller('IndexCtrl', function($scope, $state, $sce, Http) {

	$scope.loginData = {
		email: '',
		password: ''
	}

	/**
	 * Go to register page
	 */
	$scope.goRegister = function() {
		$state.go('register');
	}

	/**
	 * Do the login action
	 */
	$scope.doLogin = function() {
		$state.go('menu.find');
	}

});


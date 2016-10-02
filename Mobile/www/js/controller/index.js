angular.module('ignite.indexCtrl', [])

.controller('IndexCtrl', function($rootScope, $scope, $state, Http, LocalStorage) {

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
		console.log($scope.loginData);
		var _oData = $scope.loginData;
		Http.post('api/login', _oData).then(
			function success(success) {
				var _oData = success;
				if ((typeof _oData) === 'object') {
					console.log('Login success!');
					LocalStorage.init();
					LocalStorage.login(_oData);

					$scope.$emit('Test1', 'Emit!');
					$scope.$broadcast('Test1', 'Broadcast!');
					
					return $state.go('menu.find');
				}
				console.log('Login Failed!');
				alert('Login Failed!');
			}
		);
	}

});


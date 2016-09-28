angular.module('ignite.indexCtrl', [])

.controller('IndexCtrl', function($scope, $state, Http, LocalStorage) {

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
				var _response = JSON.parse(success);
				if (_response === 'success') {
					LocalStorage.init();
					return $state.go('menu.find');
				}
				alert('Login Failed!');
			}
		);
	}


	// db.transaction(function (tx) {  
	//    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
	// });

});


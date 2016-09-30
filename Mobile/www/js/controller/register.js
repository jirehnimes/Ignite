angular.module('ignite.registerCtrl', [])

.controller('RegisterCtrl', function($scope, $state, Http) {

	$scope.registerData = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		verify_password: '',
		birthdate: '',
		email: ''
	}

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
		var _oData = $scope.registerData;
		console.log(_oData);

		if (_oData.password != _oData.verify_password) {
			console.log('Password not equal!');
			return alert('Password not equal!');
		}

		Http.post('api/register', _oData).then(
			function success(success) {
				console.log(success);
				alert(success);
			}
		);
	}

});


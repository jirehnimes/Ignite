angular.module('ignite.indexCtrl', [])

.controller('IndexCtrl', function($rootScope, $scope, $state, Http, LocalStorage) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		LocalStorage.session().then(
	        function(success) {
	            if(success !== false){
	                return $state.go('menu.find');
	            }
	        }
	    );
    });

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

					return $state.go('menu.find');
				}
				console.log('Login Failed!');
				alert('Login Failed!');
			}
		);
	}

});


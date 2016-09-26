angular.module('ignite.indexCtrl', [])

.controller('IndexCtrl', function($scope, $state, Http) {

	$scope.loginData = {
		email: '',
		password: ''
	}

	/**
	 * Go to register page
	 */
	$scope.goRegister = function() {
		// $state.go('register');
	}

	/**
	 * Do the login action
	 */
	$scope.doLogin = function() {
		$state.go('menu.find');
	}

	$scope.resources = [
        'img/For_Wes/WEBM/For_Wes.webm',
        '*.ogv',
        '*.mp4',
        '*.swf'
    ];
    $scope.poster = 'img/For_Wes/Snapshots/For_Wes.jpg';
    $scope.fullScreen = true;
    $scope.muted = true;
    $scope.zIndex = '-100';
    $scope.playInfo = {};
    $scope.pausePlay = true;

});


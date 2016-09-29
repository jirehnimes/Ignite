angular.module('ignite.menuCtrl', [])

.controller('MenuCtrl', function($scope, $state, $window, LocalStorage) {

    var _oLeftMenu = $('#leftMenu');
    var _oRightMenu = $('#rightMenu');

    $scope.showLeft = function() {
        _oLeftMenu.show();
        _oRightMenu.hide();
    }

    $scope.showRight = function() {
        _oLeftMenu.hide();
        _oRightMenu.show();
    }

	$scope.goToFind = function() {
		// $window.location.reload();
		$state.go('menu.find');
	}

	$scope.doLogout = function() {
        LocalStorage.logout();
		$state.go('index');
	}

});


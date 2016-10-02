angular.module('ignite.menuCtrl', [])

.controller('MenuCtrl', function($scope, $state, $window, LocalStorage) {

    $scope.$on('$ionicView.beforeEnter', function (e) {
        $scope.$on('Session', function(e, data) {
            $scope.session = data;
        });
    });

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

	$scope.doLogout = function() {
        LocalStorage.logout();
		$state.go('index');
	}

});


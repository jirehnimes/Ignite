angular.module('ignite.menuCtrl', [])

.controller('MenuCtrl', function($scope, $state, $window, LocalStorage, Http) {

    $scope.$on('$ionicView.beforeEnter', function (e) {
        $scope.server = Http.session();
        
        $scope.$on('Session', function(e, data) {
            $scope.session = data;
        });
    });

    var _oLeftMenu = $('#leftMenu');

	$scope.doLogout = function() {
        LocalStorage.logout();
		$state.go('index');
	}

});


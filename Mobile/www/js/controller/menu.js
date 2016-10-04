angular.module('ignite.menuCtrl', [])

.controller('MenuCtrl', function($scope, $state, $window, LocalStorage, Http) {

    // Before entering the menu page
    $scope.$on('$ionicView.beforeEnter', function (e) {
        
        // Get the server URL
        $scope.server = Http.session();
        
        // Get the login session data
        $scope.$on('Session', function(e, data) {
            $scope.session = data;
        });
    });

    // leftMenu HTML element object
    var _oLeftMenu = $('#leftMenu');

    // When logout button is clicked
	$scope.doLogout = function() {
        LocalStorage.logout();
		$state.go('index');
	}

});


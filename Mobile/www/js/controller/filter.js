angular.module('ignite.filterCtrl', [])

.controller('FilterCtrl', function($scope, $state, $stateParams, $interval, Http, LocalStorage) {

	// Before entering the filter page
	$scope.$on('$ionicView.beforeEnter', function (e) {
		
		// Checking the user login session
		if ($scope.session === undefined) {
			$state.go('index');
		}
	});

	// Entered filter page
	$scope.$on('$ionicView.enter', function (e) {
		
		// Gets the user's filter data
		Http.get('api/filter/' + $scope.session.user_id).then(
			function success(success) {
				$scope.filter = success[0];
				console.log($scope.filter);
			}
		);

		// To update the changes in filter data
		$scope.submit = function() {
			console.log($scope.filter);
			Http.post('api/filter/' + $scope.session.user_id, $scope.filter).then(
				function success(success) {
					alert('Updated successfully!');
				}
			);
		}
	});
});


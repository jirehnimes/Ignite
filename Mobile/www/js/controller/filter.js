angular.module('ignite.filterCtrl', [])

.controller('FilterCtrl', function($scope, $state, $stateParams, $interval, Http, LocalStorage) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		if ($scope.session === undefined) {
			$state.go('index');
		}
	});

	$scope.$on('$ionicView.enter', function (e) {
		Http.get('api/filter/' + $scope.session.user_id).then(
			function success(success) {
				$scope.filter = success[0];
				console.log($scope.filter);
			}
		);

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


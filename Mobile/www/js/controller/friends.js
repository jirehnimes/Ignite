angular.module('ignite.friendsCtrl', [])

.controller('FriendsCtrl', function($scope, $state, Http) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered home');
		
		if ($scope.session === undefined) {
			$state.go('index');
		}
	});

	$scope.$on('$ionicView.enter', function (e) {
		$scope.getFriends = function() {
			Http.get('api/find/' + $scope.session.user_id).then(
				function success(success) {
					$scope.friends = success;
				}
			);
		}

		$scope.getFriends();

		$scope.goChat = function(oFriend) {
			console.log(oFriend);
			$state.go('menu.chat', {session: oFriend});
		}
	});

});


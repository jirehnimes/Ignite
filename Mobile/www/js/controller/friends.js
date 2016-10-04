angular.module('ignite.friendsCtrl', [])

.controller('FriendsCtrl', function($scope, $state, Http) {

	// Before entering the friends page
	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered home');
		
		// If login session is undefined, go back to login page
		if ($scope.session === undefined) {
			$state.go('index');
		}
	});

	// Entered friends page
	$scope.$on('$ionicView.enter', function (e) {
		
		// Get all users with 1 status and 1 reply in relationship table
		$scope.getFriends = function() {
			Http.get('api/find/' + $scope.session.user_id).then(
				function success(success) {
					$scope.friends = success;
				}
			);
		}

		// Executes the getFriends method
		$scope.getFriends();

		// Go to chat session of specific user
		$scope.goChat = function(oFriend) {
			console.log(oFriend);
			$state.go('menu.chat', {session: oFriend});
		}
	});

});


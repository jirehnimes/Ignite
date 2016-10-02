angular.module('ignite.friendsCtrl', [])

.controller('FriendsCtrl', function($scope, $state, Http) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered home');
		
		if ($scope.session === undefined) {
			$state.go('menu.find');
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

		$scope.getPendings = function() {
			Http.get('api/find/pendings/' + $scope.session.user_id).then(
				function success(success) {
					console.log(success);
					$scope.pendings = success;
				}
			);
		}

		$scope.getFriends();
		$scope.getPendings();
	});

	$scope.reply = function(oUser, bReply) {
		if (bReply === true) {
			console.log(oUser);
			console.log('Pending Accepted');
		} else {
			console.log(oUser);
			console.log('Pending Declined');
		}
	}

});


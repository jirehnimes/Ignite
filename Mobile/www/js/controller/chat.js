angular.module('ignite.chatCtrl', [])

.controller('ChatCtrl', function($scope, $state, $stateParams, $interval, Http, LocalStorage) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered chat');

		if ($scope.session === undefined) {
			$state.go('index');
		}

		$scope.friend = $stateParams.session;

		console.log($scope.session);
	});

	$scope.$on('$ionicView.enter', function (e) {

		$scope.oData = {
			user1: $scope.session.user_id,
			user2: $scope.friend.id
		}

		$scope.load = undefined;

		$scope.chatData = {
			text: '',
			user1: $scope.session.user_id,
			user2: $scope.friend.id
		}

		$scope.chats = [];

		$scope.chatIds = [];

		Http.post('api/chat', $scope.oData).then(
			function success(success) {
				$scope.chats = success;

				$scope.chats.forEach(function(mValue, iIndex) {
					$scope.chatIds.push(mValue.id);
				});
			}
		);

		$scope.submit = function() {
			Http.post('api/chat/submit', $scope.chatData).then(
				function success(success) {
					$scope.chatData.text = '';
					// $scope.chats.push(success);
					if ($scope.chatIds.includes(success.id) === false && typeof success !== 'boolean') {
						$scope.chats.push(success);
						$scope.chatIds.push(success.id);
					}
				}
			);
		}

		$scope.startLoad = function() {
			$scope.stopLoad();

			$scope.load = $interval(function() {
				Http.post('api/chat/get', $scope.oData).then(
					function success(success) {
						console.log(success);
						if ($scope.chatIds.includes(success.id) === false && typeof success !== 'boolean') {
							$scope.chats.push(success);
							$scope.chatIds.push(success.id);
						}
					}
				);
			}, 1000);
		}

		$scope.stopLoad = function() {
			$interval.cancel($scope.load);
			$scope.load = undefined;
		}

		$scope.startLoad();
	});

	$scope.$on('$ionicView.beforeLeave', function (e) {
  		$scope.stopLoad();
	});

});


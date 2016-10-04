angular.module('ignite.chatCtrl', [])

.controller('ChatCtrl', function($scope, $state, $stateParams, $interval, Http, LocalStorage) {

	// Before entering the chat page
	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered chat');

		// Checking the user login session
		if ($scope.session === undefined) {
			$state.go('index');
		}

		// Gets the data of friend clicked in the friends list
		$scope.friend = $stateParams.session;

		console.log($scope.session);
	});

	$scope.$on('$ionicView.enter', function (e) {

		// Current user and specified friend ids
		$scope.oData = {
			user1: $scope.session.user_id,
			user2: $scope.friend.id
		}

		// To be used in real-time event
		$scope.load = undefined;

		// Chat data to be sent including both user ids
		$scope.chatData = {
			text: '',
			user1: $scope.session.user_id,
			user2: $scope.friend.id
		}

		// Collection of chat messages between users
		$scope.chats = [];

		// Collection of chat ids
		$scope.chatIds = [];

		// Gets the chat records
		Http.post('api/chat', $scope.oData).then(
			function success(success) {
				$scope.chats = success;

				$scope.chats.forEach(function(mValue, iIndex) {
					$scope.chatIds.push(mValue.id);
				});
			}
		);

		// Submit the user chat
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

		// Executing the real-time checking of latest chat message
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

		// Stops the real-time event
		$scope.stopLoad = function() {
			$interval.cancel($scope.load);
			$scope.load = undefined;
		}

		// Start the real-time checker
		$scope.startLoad();
	});

	// Before leaving chat page
	$scope.$on('$ionicView.beforeLeave', function (e) {
  		// Stops the real-time event before leaving page	
  		$scope.stopLoad();
	});

});


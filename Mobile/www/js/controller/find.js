angular.module('ignite.findCtrl', [])

.controller('FindCtrl', function($rootScope, $scope, $state, Http, LocalStorage) {

	// HTML element object
	var _mCard = $('#find .card');

	// Before entering the find page
	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Find Before Enter');

		// Get the server URL
		$scope.server = Http.session();

		// Checking the user login session
		LocalStorage.session().then(
	        function(success) {

	        	// If fails, go back to login page
	            if(success === false){
	                return $state.go('index');
	            }

	            // Since this is the first page after login,
	            // it will send to all page the login session
	            // to be checked.
	            $scope.$emit('Session', success);
	        }
	    );
    });

	// Entered find page
	$scope.$on('$ionicView.enter', function (e) {
		console.log('Find Entered');

		// Collection of all cards to be displayed
		$scope.cards = [];

		// URL extension to be used
		$scope.url = 'api/find';

		// Triggers when $emit Session event is called
		$scope.$on('Session', function(e, data) {
	 		console.log('Trigger session');
	        
	 		// Save the login session in $scope.session
	        $scope.session = data;

	        // Gets all the filtered users
	        $scope.getUsers = function() {
				Http.get($scope.url + '/users/' + $scope.session.user_id).then(
					function success(success) {
						console.log(success);

						// Saved in the array
						$scope.cards = success;
					}
				);
			}

			// Removes the user data in array when swiped
			$scope.cardDestroyed = function(index) {
			  	$scope.cards.splice(index, 1);
			};

			// Executed when card is swiped left
			$scope.cardLeft = function(index) {
				console.log('Reject');

				var _oUserData = $scope.cards[index];

				// Data to be sent where status is 0
				_oData = {
					user_id: $scope.session.user_id,
					for_user_id: _oUserData.id,
					status: 0
				};

				Http.post($scope.url, _oData).then(
					function success(success) {
						var _sResponse = JSON.parse(success);
						console.log(_sResponse);
						if (_sResponse === false) {
							alert('Relationship is already set.');
						} else {
							alert('Rejected');
						}
					}
				);
			};

			// Executed when card is swiped right
			$scope.cardRight = function(index) {
				console.log('Accept');

				var _oUserData = $scope.cards[index];

				// Data to be sent where status is 1
				_oData = {
					user_id: $scope.session.user_id,
					for_user_id: _oUserData.id,
					status: 1
				};

				Http.post($scope.url, _oData).then(
					function success(success) {
						var _sResponse = JSON.parse(success);
						console.log('POST result');
						console.log(_sResponse);
						if (_sResponse === false) {
							return alert('Relationship is already set.');
						} else if (_sResponse == 3) {
							alert('It\'s a match!');
						} else {
							alert('Accepted');
						}
					}
				);
			};


			// Executes the getUsers method
	    	$scope.getUsers();
	    });

	});
});


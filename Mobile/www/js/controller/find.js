angular.module('ignite.findCtrl', [])

.controller('FindCtrl', function($rootScope, $scope, $state, Http, LocalStorage) {

	var _mCard = $('#find .card');

	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Find Before Enter');

		$scope.server = Http.session();

		LocalStorage.session().then(
	        function(success) {
	            if(success === false){
	                return $state.go('index');
	            }
	            $scope.$emit('Session', success);
	        }
	    );
    });

	$scope.$on('$ionicView.enter', function (e) {
		console.log('Find Entered');

		$scope.cards = [];

		$scope.url = 'api/find';

		$scope.$on('Session', function(e, data) {
	 		console.log('Trigger session');
	        $scope.session = data;

	        $scope.getUsers = function() {
				Http.get($scope.url + '/users/' + $scope.session.user_id).then(
					function success(success) {
						console.log(success);
						$scope.cards = success;
					}
				);
			}

			$scope.cardDestroyed = function(index) {
			  	$scope.cards.splice(index, 1);
			};

			$scope.cardLeft = function(index) {
				console.log('Reject');

				var _oUserData = $scope.cards[index];

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

			$scope.cardRight = function(index) {
				console.log('Accept');

				var _oUserData = $scope.cards[index];

				_oData = {
					user_id: $scope.session.user_id,
					for_user_id: _oUserData.id,
					status: 1
				};

				Http.post($scope.url, _oData).then(
					function success(success) {
						var _sResponse = JSON.parse(success);
						console.log(_sResponse);
						if (_sResponse === false) {
							return alert('Relationship is already set.');
						} else {
							alert('Accepted');
						}
					}
				);
			};

	    	$scope.getUsers();
	    });

	});
});


angular.module('ignite.homeCtrl', [])

.controller('HomeCtrl', function($scope, $state, $interval, Http, LocalStorage) {
	var _ionContent = $('#home ion-content');

	$scope.getFeeds = function() {
		$scope.spinner2 = false;

		Http.get($scope.url, $scope.input).then(
			function success(success) {
				console.log(success);
				var _aData = success.data;
				var _sNextURL = success.next_page_url;

				test = success;

				_aData.forEach(function(mValue, iIndex){
					$scope.feeds.push(mValue);
					$scope.feedIds.push(mValue.id);
				});

				$scope.spinner2 = true;

				if (_sNextURL === null) {
					$scope.isGetFeeds = false;
					console.error('No more data.');
				}
				$scope.url = _sNextURL;
				console.log($scope.feeds);
			}
		);
	}

	$scope.postFeed = function() {
		$scope.spinner1 = false;

		Http.post('feed', $scope.input).then(
			function success(success) {
				$scope.spinner1 = true;
				$scope.input.text = '';
				$scope.feeds.unshift(success);
				$scope.feedIds.push(success.id);
			}
		);
	}

	_ionContent.scroll(function() {
		var _oThat = $(this);

		if(this.scrollTop + _oThat.height() > this.scrollHeight - 5) {
	   		if ($scope.isGetFeeds === true) {
	   			$scope.getFeeds();
	   		}
		}
	});

	$scope.startLoad = function() {
		$scope.stopLoad();

		$scope.load = $interval(function() {
			Http.get('feed/' + $scope.session.user_id).then(
				function success(success) {
					console.log(success);
					if ($scope.feedIds.includes(success.id) === false && typeof success !== 'boolean') {
						$scope.spinner1 = false;

						$scope.feeds.unshift(success);
						$scope.feedIds.push(success.id);

						$scope.spinner1 = true;
					}
				}
			);
		}, 1000);
	}

	$scope.stopLoad = function() {
		$interval.cancel($scope.load);
		$scope.load = undefined;
	}

	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered home');
		
		if ($scope.session === undefined) {
			$state.go('menu.find');
		}
	});

 	$scope.$on('$ionicView.enter', function (e) {

		$scope.input = {
			text: '',
			user_id: $scope.session['user_id']
		};

		$scope.spinner1 = true;

		$scope.spinner2 = true;

		$scope.offset = 1;

		$scope.isGetFeeds = true;

 		$scope.url = 'feed';

  		$scope.feeds = [];

		$scope.feedIds = [];

		$scope.load = undefined;

		$scope.getFeeds();

		$scope.startLoad();
	});

	$scope.$on('$ionicView.beforeLeave', function (e) {
  		$scope.stopLoad();
	});

});


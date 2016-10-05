angular.module('ignite.homeCtrl', [])

.controller('HomeCtrl', function($scope, $state, $interval, Http, LocalStorage) {

	// HTML element object
	var _ionContent = $('#home ion-content');

	// Called to get the feeds of user and its friends
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

	// When post is submitted
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

	// Scroll detector
	_ionContent.scroll(function() {
		var _oThat = $(this);

		// Checks if scroll reaches the bottom
		if(this.scrollTop + _oThat.height() > this.scrollHeight - 5) {
	   		if ($scope.isGetFeeds === true) {
	   			$scope.getFeeds();
	   		}
		}
	});

	// Triggers when called, get the latest feed per 1 second
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

	// Stops the per second process
	$scope.stopLoad = function() {
		$interval.cancel($scope.load);
		$scope.load = undefined;
	}

	// Before entering the home page
	$scope.$on('$ionicView.beforeEnter', function (e) {
		console.log('Entered home');

		// If login session is undefined go back to login page
		if ($scope.session === undefined) {
			$state.go('index');
		}

		$scope.server = Http.session();
	});

	// Home page is entered
 	$scope.$on('$ionicView.enter', function (e) {

 		// Initial feed data
		$scope.input = {
			text: '',
			user_id: $scope.session['user_id']
		};

		// Loader image top
		$scope.spinner1 = true;

		// Loader image bottom
		$scope.spinner2 = true;

		$scope.offset = 1;

		$scope.isGetFeeds = true;

		// Initial URL
 		$scope.url = 'feed/initial/' + $scope.session['user_id'];

 		// Collection of all feed posts
  		$scope.feeds = [];

  		// Collection of all feed Ids
		$scope.feedIds = [];

		// Variable to store the startLoad
		$scope.load = undefined;

		// Get all the initial feeds
		$scope.getFeeds();

		// Starts the real-time checker of latest feed
		$scope.startLoad();
	});

 	// Before leaving the home page
	$scope.$on('$ionicView.beforeLeave', function (e) {

		// Stops the real-time event saved in $scope.load
  		$scope.stopLoad();
	});

});


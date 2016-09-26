angular.module('ignite.homeCtrl', [])

.controller('HomeCtrl', function($scope, $state, Http, $cordovaCamera) {
	
	var _ionContent = $('#home ion-content');

	$scope.input = {
		text: ''
	};

	$scope.feeds = [];

	$scope.spinner1 = true;

	$scope.spinner2 = true;

	$scope.offset = 1;

	$scope.init = function() {
		$scope.getFeeds();
	}

	$scope.getFeeds = function() {
		$scope.spinner2 = false;

		Http.get('feed', $scope.input).then(
			function success(success) {
				console.log(success);
				$scope.spinner2 = true;
				success.forEach(function(mValue, iIndex){
					$scope.feeds.unshift(mValue);
				});
			}
		);
	}

	$scope.postFeed = function() {
		$scope.spinner1 = false;

		Http.post('feed', $scope.input).then(
			function success(success) {
				console.log(success);
				$scope.spinner1 = true;
				$scope.input.text = '';
				$scope.feeds.unshift(success);
			}
		);
	}

	$scope.getImage = function() {
		if (window.cordova) {
			var options = {
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA,
			};

			$cordovaCamera.getPicture(options).then(function(imageURI) {
				var image = document.getElementById('myImage');
				image.src = imageURI;
			}, function(err) {
			// error
			});
		} else {
			console.error('No camera');
		}
		
	}

	$scope.init();

	_ionContent.scroll(function() {
		var _oThat = $(this);

		if(this.scrollTop + _oThat.height() === this.scrollHeight - 1) {
	   		$scope.getFeeds();
		}
	});

});


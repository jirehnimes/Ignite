angular.module('ignite.profileCtrl', [])

.controller('ProfileCtrl', function($scope, $state, $cordovaImagePicker, $cordovaFileTransfer, Http, LocalStorage) {

	$scope.$on('$ionicView.beforeEnter', function (e) {
		LocalStorage.session().then(
			function(success) {
				if(success === false){
		 			$state.go('index');
				}
				$scope.session = success;
			}
		);
	});

	$scope.uploadProfilePhoto = function() {
		document.addEventListener('deviceready', function () {
			if (window.imagePicker && window.FileTransfer) {
				alert('Ready');
				var options = {
					maximumImagesCount: 1,
					quality: 80
				};

				$cordovaImagePicker.getPictures(options)
					.then(function (results) {
						var _image = results[0];
						var _server = 'http://192.168.0.34:8080/api/file/profilephoto/' + $scope.session.user_id;

						var options = {
						    fileKey: 'file'
						};

						$cordovaFileTransfer.upload(_server, _image)
							.then(function(result) {
							// Success!
								alert('Success');
								alert(JSON.stringify(result.response));
							}, function(err) {
							// Error
								alert('Error');
								alert(JSON.stringify(err));
							}, function (progress) {
							// constant progress updates
							});

					}, function(error) {
					// error getting photos
					});
			} else {
				alert('Not ready');
			}
		}, false);
	}

	$scope.getProfilePhoto = function() {
		
	}

});


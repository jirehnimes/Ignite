angular.module('ignite.httpSrvc',[])

.factory("Http", function($q, $http) {

	// IP Address of the server
	var _sServer = 'http://192.168.0.34:8080/';

	// Additional options for the request
	var _oOptions = {
		headers: {
    	    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    	}
	};

	function get(sUrl) {

		// Initialize promise
	    var _mDeferred = $q.defer();

	    // HTTP GET Method
	    // To retrieve data from Rest API Server
		$http.get(
			_sServer + sUrl,
			_oOptions
		).then(
			function success(mSuccess) {
				console.log('GET Success');
		        _mDeferred.resolve(mSuccess.data);
			},
			function error(mFail) {
				console.log('GET Error');
		        _mDeferred.reject('API Error');
			}
		);

		// Return stored promise
	    return _mDeferred.promise;
	}

	function post(sUrl, oData) {

		// Initialize promise
	    var _mDeferred = $q.defer();

	    // HTTP POST Method
	    // To create, update or delete data to Rest API Server
		$http.post(
			_sServer + sUrl,
			oData
		).then(
			function success(mSuccess) {
				console.log('POST Success');
				_mDeferred.resolve(mSuccess.data);
			},
			function error(mFail) {
				console.log('POST Error');
				_mDeferred.reject('API Error');
			}
		);

		// Return stored promise
	    return _mDeferred.promise;
	}

	return{
		get: function(sUrl) {
			return get(sUrl);
		},

		post: function(sUrl, oData) {
			return post(sUrl, oData);
		}
	}
})
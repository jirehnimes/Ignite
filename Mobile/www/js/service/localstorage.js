angular.module('ignite.localStorageSrvc',[])

.factory("LocalStorage", function($q) {

	var _DB = undefined;

	function init() {
		if (_DB) {
			return false;
		}
		_DB = window.openDatabase('ignitedb', '1.0', 'Ignite DB', 2 * 1024 * 1024);
		return true;
	}

	return{
		init: function() {
			return init();
		}
	}
})

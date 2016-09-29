angular.module('ignite.localStorageSrvc',[])

.factory("LocalStorage", function() {

	var _DB = undefined;

	function init() {
		if (_DB) {
			console.log('Local storage already loaded.');
			return false;
		}

		_DB = window.openDatabase('ignitedb', '1.0', 'Ignite DB', 2 * 1024 * 1024);
		console.log('Local storage loaded.');

		_DB.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS SESSION (user_id unique, is_login, first_name, last_name, email, password, birthdate, gender, photo)');
		});

		return true;
	}

	function login(oUser) {
		_DB.transaction(function(tx) {
			tx.executeSql('SELECT * FROM SESSION WHERE user_id=' + oUser.id, [], function(_tx, results) {
				var _resLen = results.rows.length;
				if (_resLen === 0) {
					var _sQuery = 'INSERT INTO SESSION VALUES (' + oUser.id + ', ' +
						'1, "' +
						oUser.first_name + '", "' +
						oUser.last_name + '", "' +
						oUser.email + '", "' +
						oUser.password + '", "' +
						oUser.birthdate + '", "' +
						oUser.gender + '", "' +
						oUser.photo +
					'")';
					_tx.executeSql(_sQuery);
				}
				return true;
			}, null);
		});
	}

	function logout() {

	}

	return{
		init: function() {
			return init();
		},

		login: function(oUser) {
			return login(oUser);
		}
	}
})

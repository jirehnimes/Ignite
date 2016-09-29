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
				var _sQuery = '';

				if (_resLen === 0) {
					_sQuery = 'INSERT INTO SESSION VALUES (' + oUser.id + ', ' +
						'"hello", "' +
						oUser.first_name + '", "' +
						oUser.last_name + '", "' +
						oUser.email + '", "' +
						oUser.password + '", "' +
						oUser.birthdate + '", "' +
						oUser.gender + '", "' +
						oUser.photo +
					'")';
					
				}

				_sQuery = 'UPDATE SESSION SET is_login=1 WHERE user_id=' + oUser.id;

				_tx.executeSql(_sQuery);

				return true;
			}, null);
		});
	}

	function logout() {
		_DB.transaction(function(tx) {
			tx.executeSql('SELECT * FROM SESSION WHERE is_login=1', [], function(_tx, results) {
				console.log(results);
				var _oData = results.rows[0];

				if (_oData) {
					var _sQuery = 'UPDATE SESSION SET is_login=0 WHERE user_id=' + _oData.user_id;
					_tx.executeSql(_sQuery);
					console.log(_sQuery);
					return true;
				}
				return false;
			}, null);
		});
	}

	return{
		init: function() {
			return init();
		},

		login: function(oUser) {
			return login(oUser);
		},

		logout: function() {
			return logout();
		}
	}
})

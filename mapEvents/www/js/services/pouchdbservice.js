angular.module('mapEventsApplication').factory('pouchdbService', ['$q', function($q){

	var db;
	
	return {

		initDB: function() {
			// Creates the database or open if it already exists
			db = new PouchDB('mapeventsapplication', {adapter: 'websql'});
		},

		insertAlert: function(alert, callback){			
			return $q.when(db.post(alert, function(err, result){

				if(err){
					console.error(err);
				}

				if(callback){
					callback(result);
				}
				
			}));
		},

		updateAlert: function(alert){
			return $q.when(db.put(alert));
		},

		deleteAlert: function(alert){
			return $q.when(db.remove(alert));
		},

		getAlert: function(alertId){
			return $q.when(db.get(alertId));
		},

		getAllAlerts: function(){

			var alerts = [];

				return $q.when(db.allDocs({include_docs: true, attachments: true}).then(function(docs){

					alerts = docs.rows.map(function(row){

						return row.doc;

					});

					// // Listen for changes on the database.
					// db.changes({live: true, since: 'now', include_docs: true}).on('change', onDatabaseChange);

					return alerts;

				}));		


		}

	}

}]);
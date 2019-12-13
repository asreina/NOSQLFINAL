exports.postForm = function(firstname, lastname, email, callback) {
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect("mongodb://localhost:27017/FINAL", function (err, db) {
		if(err){
			callback("err", "Error On submitting form, please try again!");
		} else{
			var dbo = db.db("final");
			var data = {FirstName : firstname, LastName : lastname, Email : email};

			dbo.collection("FormSubmissions").insertOne(data, function(err, res) {
				if(err) {
					callback("err", "Error On submitting form, please try again!");
					db.close();
				} else{
					callback("suc", "Success");
					db.close();
				}
			});

		}
	});
}

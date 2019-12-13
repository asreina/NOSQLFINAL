var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');






var articles = require('./framework/ny_times.js');


var app = express();



app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));




app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3001);


app.get('/', function(req, res) {
 res.render('home', {
    // pictures: modules.getunopics()
 });
});

app.get('/nytimes', function(req, res) {
    articles.GetArticles(function(data){
        res.render('nytimes', {
            title1 : data[0],
            title2 : data[1],
            title3 : data[2],
    });

    });
});

app.get('/myinfo', function(req, res) {
     return res.render('myinfo.handlebars')
});

app.get('/form', function(req, res) {
    res.render('form', {
		fail : req.session.danger,

	});
	delete req.session.danger;
});



app.post('/formpost', (req, res) => {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;

	handleForm.postForm(firstname, lastname, email, function(status, message){
		if(status === 'suc') {
			req.session.success = message;
			res.redirect('/');
		}else {
			req.session.danger = message;
			res.redirect('/form');
		}
	})
})

app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next){
   console.log(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );

});

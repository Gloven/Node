//============================ DB ============================================
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = mongoose.connection;
var connection =mongoose.connect('mongodb://users_db:wlassword256463@ds033036.mlab.com:33036/users_db');

var userSchema = mongoose.model('users', {
    f_name: String,
    l_name: String,
    avatar: String,
    id: String,
    counter: Number,
    _id: Number
}); // создание конструктора\

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
// ==============    =========================      =====================

var user = require('./user');
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var txt = 'Some text';
http.createServer(function (req, res) {

    if (req.url == '/book'){
        res.write(200);
        res.end("Ok");
    }
    if (req.url == '/') {
        sendFile('index.html', res);
    }
    if (req.url == '/all') {
                userSchema.find().then(function (response){
                txt = (JSON.stringify(response));
                res.write(txt);
                console.log('promise');res.end();
        }, function(error) {
            console.log(error)
        });
    } //promise
    if (req.url == '/add') {
        var post_data = "";
        req.on('data', function (chunk) {
            post_data += chunk;
        });
        req.on('end', function () {
            var post = qs.parse(post_data);
            var record = new userSchema(new user(post['firstname'], post['lastname']));
            record.save(function (err) {
                if (err) {
                    console.log(err.stack);
                }
                console.log('saving done...');
            });
            res.writeHead(200);
            res.end('Ok');
        });
    }


}).listen('8888');
console.log('Server started...');


function sendFile(file, res) {
    var fileStream = fs.createReadStream(file);

    fileStream.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server error');
        console.log(err);
    });

    fileStream.pipe(res);
    fileStream.on('open', function () {
        console.log('open');
    });
    fileStream.on('close', function () {
        console.log('close');
    });
}

/* function convertToStr(obj) {
 if (typeof obj !='object') {
 console.log('Error! Type = '+typeof obj)
 }
 var str='';
 for (var param in obj) {
 switch (param) {
 case 'f_name' :
 str += '{' + (param + ':' + obj[param]) + ' ';
 break;
 case 'counter':
 str += (param + ':' + obj[param]) + '}'+'\r\n';
 break;
 default :
 str += (param + ':' + obj[param]) + ' ';
 }

 }
 return str;
 }*/

/* function appendUsers(obj) {
 fs.appendFile('users.txt',convertToStr(obj) , function (err) {
 if (err) throw err;
 console.log('The "data to append" was appended to file!');
 })
 }*/


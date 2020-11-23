const express = require('express');
const app = express();
const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream') 
var os = require("os");
var ip = require('ip');

var fs = require("fs");
var util = require("util");

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'))

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  })
  
// setup the logger
morgan.token('host', function(req, res) {
    return os.hostname();
});
app.use(morgan(':date[web] - :method :url :host', { stream: accessLogStream }))

app.get('/', (req, res) => {

    var log_array = fs.readFileSync(path.join(__dirname, "log", "access.log")).toString().split("\n");
    for(i in log_array) {
        console.log(log_array[i]);
    }    
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index', node_name: os.hostname(), node_ip: ip.address(), pvc_path: __dirname+'/log', log_content: log_array});

});

app.listen(port, () => console.log(`App listening to port ${port}`));
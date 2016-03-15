var express = require('express'); 

var app = new express(); 

var validator = require('./js/validator.js'); 

var DictionaryManager = require('./js/dictionaryManager.js'); 

var dictionaryMgr = new DictionaryManager("https://fierce-everglades-29355.herokuapp.com/"); 

var valid = new validator('https?:\/\/www\.[a-z]{1,100}\.[a-z]{2,3}.*'); 

var baseAppUrl = "https://fierce-everglades-29355.herokuapp.com/"; 

app.use(express.static(__dirname + '/view')); 
//html files in here

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.sendFile("index.html"); 
}); 

app.get('/test', function(req, res) {
    var providedUrl = "test"; 
    dictionaryMgr.addToDictionary(providedUrl); 
    res.json(dictionaryMgr.alternativeUrls[dictionaryMgr.alternativeUrls.length-1]); 
    console.log(dictionaryMgr.alternativeUrls); 

}); 

app.get('/*', function (req, res) {
    
    var providedUrl = req.url.substring(1); 
    console.log(req.url); 

    if (typeof Number(providedUrl) == "number" && !isNaN(Number(providedUrl)) && Number(providedUrl) < dictionaryMgr.alternativeUrls.length) {
        
        res.redirect(dictionaryMgr.findAlternative(providedUrl));
        
    }
    
    else if (!valid.test(providedUrl)) {
        
        res.json({
            "error": "That's not a properly formatted URL."
        }); 

    }
    
    else if (!Number(providedUrl) && dictionaryMgr.checkForExisting(providedUrl)) {

        res.json({
            'requested-url': providedUrl, 
            'message': 'an alternative to the requested url already exists!'
        });    
    
        }
    
    else {

        dictionaryMgr.addToDictionary(providedUrl); 
        res.json(dictionaryMgr.alternativeUrls[dictionaryMgr.alternativeUrls.length-1]); 
    }
    
}); 



app.listen(app.get('port'), function() {
    console.log('app is running on port', app.get('port')); 
}); 





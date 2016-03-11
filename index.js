var express = require('express'); 

var app = new express(); 

var validator = require('./js/validator.js'); 

var valid = new validator('https?:\/\/'); 

var baseAppUrl = "https://fierce-everglades-29355.herokuapp.com/"; 

app.use(express.static(__dirname + '/view')); 
//html files in here

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.sendFile("index.html"); 
}); 

app.get('/*', function (req, res) {
    var providedUrl = req.params[0]; 
    console.log(providedUrl); 
    
    var pattern = /https?:\/\//; 
    
    if (!valid.test(providedUrl)) {
        
        res.json({
            "error": "That's not a properly formatted URL."
        }); 

    }
    
    else if (typeof Number(providedUrl) == "number" && !isNaN(Number(providedUrl))) {
        
        res.redirect(findAlternative(baseAppUrl+providedUrl));       
    }
    
    else if (!Number(providedUrl) && checkForExisting(providedUrl, alternativeUrls)) {
        console.log('else if', providedUrl); 
        res.json({
            'requested-url': providedUrl, 
            'message': 'an alternative to the requested url already exists!'
        }); //TODO: add logic to get the existing alternate URL.   
    
        }
    
    else {
        console.log('else'); 

        addToDictionary(baseAppUrl, providedUrl, alternativeUrls); 
        res.json(alternativeUrls[alternativeUrls.length-1]); 
    }
    
}); 

app.get('/all', function (req, res) {
    
    res.json(alternativeUrls); 
    
}); 


app.listen(app.get('port'), function() {
    console.log('app is running on port', app.get('port')); 
}); 


//in memory database of URLs

//TODO: all of the below should be abstracted into its own module for URL management and brought in as a dependency.

var alternativeUrls = []; 

//looks through the dictionary to see if a URL already exists for the provided url 

function checkForExisting(aSearchTerm, anArray) {
    var exists = false; 
    anArray.forEach(function(value) {
        if (value.providedUrl == aSearchTerm) {
            exists = true; 
        }
    }); 
    return exists; 
}

function findAlternative(searchString) {
    var alternative = ""; 
    alternativeUrls.forEach(function(value) {
        if (value.alternativeUrl == searchString) {
            alternative = value.providedUrl; 
        }
    }); 
    return alternative; 
}


//two functions below are for adding a new URL and generating a new URL 

function addToDictionary(baseUrlString, value, anArray) {
    anArray.push({
        providedUrl: value, 
        alternativeUrl: baseUrlString+getAlternativeUrl()
    }); 
}

var count = 0; 

function getAlternativeUrl () {
    var alternativeUrl = count; 
    count++; 
    return alternativeUrl; 
}


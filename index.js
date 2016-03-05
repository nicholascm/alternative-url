var express = require('express'); 

var app = new express(); 

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send("hello url-shortener!"); 
}); 

app.get('/:aUrl', function (req, res) {
    var providedUrl = req.params.aUrl; 
    if(checkForExisting(providedUrl, alternativeUrls)) {
        res.redirect('www.google.com'); //TODO: add logic to get the existing URL.   
        }
    else {
        addToDictionary("www.example.com", providedUrl, count, alternativeUrls); 
        res.json(alternativeUrls); 
    }
    
}); 


app.listen(app.get('port'), function() {
    console.log('app is running on port', app.get('port')); 
}); 


//first check if the URL exists in the URL dictionary
//if it does, redirect to that URL from the current URL 
//if it doesn't, create a new URL for it, and respond with the JSON 
//of the supplied URL vs the alternative URL 

var count = 0; 

var alternativeUrls = []; 

function checkForExisting(aSearchTerm, anArray) {
    var exists = false; 
    anArray.forEach(function(value) {
        if (value.providedUrl == aSearchTerm) {
            exists = true; 
        }
    }); 
    return exists; 
}

function addToDictionary(baseUrlString, value, value2, anArray) {
    anArray.push({
        providedUrl: value, 
        alternativeUrl: baseUrlString+getAlternativeUrl(value2)
    }); 
}

function getAlternativeUrl (theCurrentCount) {
    var alternativeUrl = "/"+theCurrentCount+1; 
    return alternativeUrl; 
}
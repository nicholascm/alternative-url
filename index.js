var express = require('express'); 

var app = new express(); 

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send("hello url-shortener!"); 
}); 

app.get('/:aUrl', function (req, res) {
    var providedUrl = req.params.aUrl; 
    
    if (false) {
                
    }
    
    else if (checkForExisting(providedUrl, alternativeUrls)) {
    
        res.json({'exists': providedUrl}); //TODO: add logic to get the existing URL.   
    
        }
    
    else {
    
        addToDictionary("www.example.com", providedUrl, alternativeUrls); 
        res.json(alternativeUrls); 
    }
    
}); 


app.listen(app.get('port'), function() {
    console.log('app is running on port', app.get('port')); 
}); 

//0: check if the provided input is a URL, or a number
//if its a number and it exists, go to that URL
//if its a number, and it doesn't exist, respond with an error
//first check if the URL exists in the URL dictionary
//if it does, print out that URL and the shortened URL 
//if it doesn't, create a new URL for it, and respond with the JSON 
//of the supplied URL vs the alternative URL 




//in memory database of URLs

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


//two functions below are for adding a new URL and generating a new URL 

function addToDictionary(baseUrlString, value, anArray) {
    anArray.push({
        providedUrl: value, 
        alternativeUrl: baseUrlString+getAlternativeUrl()
    }); 
}

var count = 0; 

function getAlternativeUrl () {
    var alternativeUrl = "/"+count; 
    count++; 
    return alternativeUrl; 
}
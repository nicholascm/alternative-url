
function DictionaryManager(baseUrl) {
    
    this.baseUrl = baseUrl; 
    
    this.alternativeUrls = []; 
    
    this.count = 0; 
    
    //looks through the dictionary to see if a URL already exists for the provided url 

    this.checkForExisting = function(aSearchTerm) {
        var exists = false; 
        
        this.alternativeUrls.forEach(function(value) {
            if (value.providedUrl == aSearchTerm) {
                exists = true; 
            }
        }); 
        
        return exists; 
    }; 
    
    //searches the list to check if an identical item in the dictionary already exists
    
    this.findAlternative = function(searchString) {
        
        var searchStringWithBase = this.baseUrl + searchString; 
        var alternative = ""; 
        
        this.alternativeUrls.forEach(function(value) {
            if (value.alternativeUrl == searchStringWithBase) {
                alternative = value.providedUrl; 
            }
        }); 
        console.log("find it", alternative); 
        return alternative; 
    }; 
    
    this.addToDictionary = function(value) {
        
        this.alternativeUrls.push({
                providedUrl: value, 
                alternativeUrl: this.baseUrl+this.getAlternativeUrl()
        });  
    
    }; 
    
    this.getAlternativeUrl = function() {
        var alternativeUrl = this.count; 
        this.count++; 
        return alternativeUrl;  
    }; 

}

module.exports = DictionaryManager; 


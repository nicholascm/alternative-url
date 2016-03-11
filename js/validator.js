function Validator(pattern) {
    
    this.pattern = new RegExp(pattern); //should be a regex value
    
    this.test = function(string) {
        if (this.pattern.test(string)) {
            return true; 
        }
        else {
            return false; 
        }
    }
}

module.exports = Validator; 
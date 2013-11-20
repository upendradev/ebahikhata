(function() {
   //Declaring variables  
    var fs, scan;
    var app={'name': "Upendra"};

    //Requiring files
    fs = require('fs');
    require('./scan.js')('../test', app);

}).call(this);
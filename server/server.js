(
    function() {
        "use strict";
        let express = require('express');
        const path = require("path");
        const cors = require('cors');

        let app = express();
        app.use(cors({origin: 'http://localhost:3000',credentials:true,allowedHeaders:['Origin']}));
        
        app.get('/', function(req, res) {
           res.send("Hello world! Lala Seth is here!");
        });

        app.get('/api/makers', function(req, res) {
            res.send("Hello world! Lala Seth is here!");
         });
        
        app.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, "../build", "index.html"));
        });

        let server = app.listen(5000, function () {
            console.log('Express server listening on port ' + server.address().port);
        });
        module.exports = app;
    }()
);
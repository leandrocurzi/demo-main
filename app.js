const cfg = require("./config");

if(cfg && cfg.config){
    const _config = cfg.config;
    if(_config.port && _config.module && _config.endpoint){
        setupServer(_config);
    }
}

function setupServer(config){
    const moduleName = config.module;
    var Module = require(moduleName);
    var endpoint = "/" + config.endpoint;
    var port = config.port;

    var express = require("express");
    var bodyParser = require('body-parser');
    var app = express();
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    var router = express.Router();
    
    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do general logging
        //console.log(req);
        next();
    });

    router.route(endpoint).get((req,res)=>{
        try{
            let resp = Module.get(req.query);
            res.status(200).json(resp);
        }
        catch(e){
            res.status(500).json({status: false, error: e.message});
        }
    });

    

    app.use('/api', router);
    app.listen(port, () => console.log("--> Server on",port,":",endpoint));
}


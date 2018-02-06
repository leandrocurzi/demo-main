const cfg = require("./config");


if(cfg && cfg.config){
    const _config = cfg.config;
    if(_config.port && _config.module && _config.endpoint){
        setupServer(_config);
    }
}

function setupServer(config){
    const moduleName = config.module;
    var module = require(moduleName);
    console.log("-> Module:", module);
}


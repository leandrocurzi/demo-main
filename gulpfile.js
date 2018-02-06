const argv = require("yargs").argv;
const fs = require("fs");
const gulp = require("gulp");

if(!argv['s']) throw "Specify a service to build using -s";

function createAppConfig(){
    const configFilePath = "config.js";

    let service = (argv['s'].length > 0) ? argv['s'].trim().toLowerCase() : "";
    let _module = (service.length > 0) ? "pom-test-service-" + service: "";

    let config = {
        module: _module,
        port: "3000",
        endpoint: service
    };

    //now that we've created our app configuration model, lets inject it
    //into the project source
    let jsonConfig = "module.exports = {config:" + JSON.stringify(config) + "}";
    fs.writeFile(configFilePath, jsonConfig, (err)=>{
        if(err) throw "Error creating config file for app server";
        else console.log("--> Success! created", configFilePath, ">", jsonConfig);
    });
}

gulp.task("default", createAppConfig);



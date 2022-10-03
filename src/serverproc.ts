import { Server } from "./server";


const backendServer = new Server();
backendServer.postStartFcn = function(){
    const process = require('process');
    process.send({status:true});
};
backendServer.start();


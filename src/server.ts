import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import { router } from './routes'

export class Server {
  app: any;
  postStartFcn: any = undefined;

  constructor(){
    this.app = express()
        .use(cors())
        .use(bodyParser.json())
        .use(bearerToken())
        .use(router);      
  }

  start(){
    const port = 4201
    this.app.listen(port, () => {
      console.log('Server listening on port ' + port.toString());
      console.log('Starting postStartFcn');
      if (this.postStartFcn !== null && this.postStartFcn !== undefined){
        this.postStartFcn();
      }
    });
  }

}



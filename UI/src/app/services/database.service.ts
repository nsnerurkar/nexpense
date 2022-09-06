import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  baseUrl: string;
  baseOptions: any;

  constructor(private http: HttpClient) { 
    // TODO: Change this when Integrating with server.
    // Ideally we should be reading this via a configuration file or something.
    this.baseUrl = "http://localhost:4201/";
    let heads = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.baseOptions = {
      headers: heads
    };
  }

  getUrl(model:string, type:string){
    let retUrl = this.baseUrl + model.toLowerCase() +"/";
    switch(type){
      case "create":
      case "update":
      case "delete":
      case "read":
        return retUrl;      
      case "byDate":
        return(retUrl + "byDate/");
      default:
        throw new Error("Invalid type for making URL");

    }
  }

  getExpenseData(){
    return this.http.get<Expense[]>(this.getUrl('Expense','read'));
  }

  getExpenseByDateRange(dateStart:Date,dateEnd:Date){
    return this.http.get<Expense[]>(this.getUrl('Expense','byDate') +'/'+dateStart.toISOString()+'/'+dateEnd.toISOString());
  }




}


import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx'
import { Observable } from "rxjs/Rx";

@Injectable()
export class ServerService {
    constructor(private http: Http){}

    storeServers(servers: any[]){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        // return this.http.post('https://http-8a947.firebaseio.com/data.json', servers, {headers});
        return this.http.put('https://http-8a947.firebaseio.com/data.json', servers, {headers});
    }

    getServers(){
        return this.http.get('https://http-8a947.firebaseio.com/data')
            .map((response: Response)=>{
                const data = response.json();
                for(let server of data){
                    server.name = 'FETCHED_' + server.name;
                }
                return data;
            })
            .catch((error:Response)=>{
                // console.log(error)
                return Observable.throw('Something Went Wrong');
            });
    }

    getAppName(){
        return this.http.get('https://http-8a947.firebaseio.com/appName.json')
            .map((response: Response)=>{
                return response.json();
            });
    }
}
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  loginPost(endpoint : string, username : string, password : string){
    let basicAuth = btoa(username + ':' + password);
    // console.log(basicAuth);
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
    headers = headers.append('Accept','application/json');
    headers = headers.append('content-type','application/json');
    const options = { headers: headers, withCredentials: false };
    const url = environment.backendUrl + endpoint;
    return this.http.post(url, JSON.stringify(basicAuth), options)
  }
  authenticatedPost(endpoint:string, data: any, xtoken:string){
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    headers = headers.append('x-api-key', xtoken );
    headers = headers.append('Accept','application/json');
    headers = headers.append('content-type','application/json');
    const options = { headers: headers, withCredentials: false };
    const url = environment.backendUrl + endpoint;
    return this.http.post(url, JSON.stringify(data), options)
  }
  unAuthenticatedPost(endpoint:string, data: any){
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    headers = headers.append('Accept','application/json');
    headers = headers.append('content-type','application/json');
    const options = { headers: headers, withCredentials: false };
    const url = environment.backendUrl + endpoint;
    return this.http.post(url, JSON.stringify(data), options)
  }
  authenticatedGet(endpoint:string, xtoken:string){
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    headers = headers.append('x-api-key', xtoken );
    headers = headers.append('Accept','application/json');
    headers = headers.append('content-type','application/json');
    const options = { headers: headers, withCredentials: false };
    const url = environment.backendUrl + endpoint;
    return this.http.get(url, options)
  }
}

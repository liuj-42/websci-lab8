import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string) {
    return this.httpClient.get(url);
  }

  public post(url: string, body: string) {
    return this.httpClient.post(url, {data: body});
  }

  public put(url: string, body:string) {
    return this.httpClient.put(url, {data: body});
  }

  public del(url: string) {
    return this.httpClient.delete(url);
  }
}

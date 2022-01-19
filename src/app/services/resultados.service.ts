import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private serverUrl = "https://encuestasum.herokuapp.com/";
  // private serverUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  private crearRequestHeader(token) {
    //Obtener Token
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    });

    return headers;
  }

  getAll(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/resultado", { headers: headers });
  }

  getByEncuesta(token, id) {
    let headers = this.crearRequestHeader(token);
    
    return this.http.get(
      this.serverUrl + "api/resultado/byencuesta/" + id, { headers: headers });
    }
    
    save(token, data: any) {
    let headers = this.crearRequestHeader(token);
    
    return this.http.post(
      this.serverUrl + "api/resultado", data, { headers: headers });

  }

}

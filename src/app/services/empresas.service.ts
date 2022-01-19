import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private serverUrl = "https://encuestasum.herokuapp.com/";

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
      this.serverUrl + "api/empresa/", { headers: headers });
  }

  // Obtener un usuario por su ID
  getById(token, id) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/empresa/" + id, { headers: headers });
  }

}

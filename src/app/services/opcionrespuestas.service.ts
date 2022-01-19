import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class OpcionRespuestaService {
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

  getByPregunta(token, id) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/opcionrespuesta/by/pregunta/" + id, { headers: headers });
  }

}

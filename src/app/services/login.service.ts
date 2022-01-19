import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  registrar(data: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(
      this.serverUrl + "api/usuarios/registrar", data, { headers: headers });

  }

  autenticar(data: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(
      this.serverUrl + "api/usuarios/autenticar", data, { headers: headers });

  }

  logout() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(
      this.serverUrl + "api/usuarios/autenticar", "qweqwe", { headers: headers });
  }

  obtenerUsuarios(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/getusers" , { headers: headers });
  }

  obtenerUsuarioPorId(id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/getuser/" + id, { headers: headers });
  }

  cambiarCel(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/changecel/" + id, data, { headers: headers });
  }

  cambiarIdent(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/changeidentification/" + id, data, { headers: headers });
  }

  cambiarName(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/changename/" + id, data, { headers: headers });
  }

  cambiarCountry(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/changecountry/" + id, data, { headers: headers });
  }

  cambiarUsuario(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/changeusuario/" + id, data, { headers: headers });
  }

  // Actualizar contraseña del adminsitrador
  actualizarContrasenia(data, email, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.put(
      this.serverUrl + "api/usuarios/updatePassword/" + email, data, { headers: headers });
  }

  // Eliminar administrador
  eliminarUsuario(_id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/deleteuser/" + _id, { headers: headers });
  }

  //REINICIAR SERVIDOR HEROKU
  rebootServer() {
    let headers = new HttpHeaders({
      // "Authorization": "Basic jhonatanocar96@gmail.com:2badea95-4230-44ce-9587-faee2d3f4171",
      "Authorization": "Basic amhvbmF0YW5vY2FyOTZAZ21haWwuY29t:2badea95-4230-44ce-9587-faee2d3f4171",
      "Content-Type": "application/json",
      "Accept": "application/vnd.heroku+json; version=3"
    });

    return this.http.delete(
      "https://api.heroku.com/apps/metatradermk/dynos", { headers: headers });
  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private serverUrl = "https://metatradermk.herokuapp.com/";
  private token: string;

  constructor(private http: HttpClient) { }


  private crearRequestHeader(token) {
    //Obtener Token
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    });

    return headers;
  }

  // Obtener todos los usuarios
  getAllUsers(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/getusers/", { headers: headers });
  }

  // Obtener un usuario por su ID
  getUserById(token, id) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/getuser/" + id, { headers: headers });
  }

  getFavoritePars(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/favoritepar/", { headers: headers });

  }

  //Comprobar si hay conexión entre el celular y el EA
  getIsConnected(id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/getIsconnected/" + id, { headers: headers });

  }

  //Finalizar la conexión entre el celular y el EA
  terminateConnection(id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/usuarios/setIsConnectedFalse/" + id, { headers: headers });

  }

  getFavoriteParsByUser(id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/favoritepar/getallfavoritepar/" + id, { headers: headers });

  }

  //En la lista de pares favoritos
  saveFavoritePar(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/favoritepar/" + id, data, { headers: headers });
  }

  //De la lista de pares favoritos
  deleteFavoritePar(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/favoritepar/deletebyuser/" + id, data, { headers: headers });
  }


  getIps(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/ip/", { headers: headers });

  }

  getIpByUser(id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/ip/getallip/" + id, { headers: headers });

  }

  //En la lista de pares favoritos
  saveIp(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/ip/" + id, data, { headers: headers });
  }

  //De la lista de IP's
  deleteIp(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/ip/deletebyuser/" + id, data, { headers: headers });
  }

  /////////////////////////////ADMINS//////////////////////////
  
  getAdmins(token) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/admin/", { headers: headers });

  }

  getAdminById(token, id) {
    let headers = this.crearRequestHeader(token);

    return this.http.get(
      this.serverUrl + "api/admin/" + id, { headers: headers });
  }

  saveAdmin(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/admin/" + id, data, { headers: headers });
  }

  deleteAdmin(data: any, id, token) {
    let headers = this.crearRequestHeader(token);

    return this.http.post(
      this.serverUrl + "api/admin/" + id, data, { headers: headers });
  }

}
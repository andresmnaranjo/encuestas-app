import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { LoginService } from "../services/login.service";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { LoaderService } from '../loader.service';
import { AppComponent } from '../app.component';

import { last } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;

  isHiddenPass = true;
  isRememberSelected: any;

  public tipologin = ""; //Para determinar si se va a iniciar como administrador o como cobrador

  isFingerprintEnable: boolean = false;

  token: string = "";

  _id: string = "";
  email: string = "";
  name: string = "";
  lastname: string = "";
  login: string = "";
  permission: string = "";
  typeuser: string = "";
  state: string = "";

  constructor(private appComponent: AppComponent,
    private loginService: LoginService,
    public alertController: AlertController,
    private platform: Platform,
    private router: Router,
    private ionLoader: LoaderService,
    private storage: Storage) {
    this.user = new User();

  }

  ngOnInit() {
    this.user = new User();

    this.platform.ready().then(() => {

      // Mostrar Sidemenu
      this.appComponent.is_logged = false;

    });

  }

  changeHidden() {
    if (this.isHiddenPass) {
      this.isHiddenPass = false;
    } else {
      this.isHiddenPass = true;
    }
  }

  submit() {
    
    this.user.email = this.user.email.replace(/\s/g, '');
    
    if(!this.user.email || !this.user.pass){
      return this.alert("Todos los datos son obligatorios");
    }
    this.ionLoader.showLoader();

    //Subscribir promesa
    this.loginService.autenticar(
      {
        correo: this.user.email,
        contrasena: this.user.pass
      }
    ).subscribe((result: any) => {
      this.storage.clear();
      // this.ionLoader.showHideAutoLoader();

      this.email = result.user.correo;
      this._id = result.user._id;
      this.name = result.user.nombre;
      this.lastname = result.user.apellido;
      this.login = result.user.login;
      this.permission = result.user.permiso;
      this.typeuser = result.user.tipousuario;
      this.state = result.user.estado;

      this.storage.set('_id', this._id);
      this.storage.set('email', this.email);
      this.storage.set('name', this.name);
      this.storage.set('lastname', this.lastname);
      this.storage.set('login', this.login);
      this.storage.set('permission', this.permission);
      this.storage.set('typeuser', this.typeuser);
      this.storage.set('state', this.state);
      this.storage.set('token', result.token.accessToken);

      //Variable para determibar si el usuario es administrador o cobrador

      // Inicializar variables para mostrar en el side menu
      this.appComponent.email = this.email;
      this.appComponent.name = this.name;
      this.appComponent.lastname = this.lastname;
      this.appComponent._id = this._id;

      //Habilitar side menu
      this.appComponent.is_logged = true;
      this.appComponent.change();

      this.router.navigate(['/folder/Inicio'])
      this.ionLoader.hideLoader();

    }, (error) => {
      //Si es una respuesta de error del api
      if (error["error"]["message"]) {
        console.log(JSON.stringify(error));

        this.alert(error["error"]["message"]);
        this.ionLoader.hideLoader();


      } else {
        //Si es un error del servidor de HEROKU
        // this.alert("Error");
        this.ionLoader.hideLoader();

      }
    }

    );

    this.ionLoader.hideLoader();

  }

  async alert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInitApp() {
    this.appComponent.ngOnInit();
  }

  async alertMsg(title, msg) {

    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: (alertData) => {
          }
        },
        {
          text: 'Cancel'
        }]
    });

    await alert.present();
  }

}

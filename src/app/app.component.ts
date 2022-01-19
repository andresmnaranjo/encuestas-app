import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  darkMode: boolean = true;

  public folderSelected: string = '';

  //Ocultar side menu en login
  public is_logged = false;

  public selectedIndex = 0;
  public appPages = [];

  public name = '';
  public lastname = '';
  public email = '';
  public _id = '';

  // Para comprobar si el usuario ya pagó o no
  public payment = '';

  // public labels = ['Family'];
  public toastPayment;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public alertController: AlertController,
    private router: Router,
    public cd: ChangeDetectorRef
  ) {
    this.initializeApp();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.change();

    });
  }

  // funcion para cambiar el modo desde el toggle
  change() {
    // this.darkMode = !this.darkMode;
    // document.body.classList.toggle('dark');
  }

  changeDark() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  changeDarkMode() {

    if (this.darkMode) {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }
  }

  ngOnInit() {

    this.cd.detectChanges();
    
    this.is_logged = false;

    this.platform.ready().then(() => {


      this.appPages = [
        {
          title: "INICIO",
          url: '/folder/Inicio',
          icon: 'Home'
        }
      ];

      this.storage.get('name').then((val) => {
        this.name = val;
      });

      this.storage.get('lastname').then((val) => {
        this.lastname = val;
      });

      this.storage.get('email').then((val) => {
        this.email = val;
      });

      this.storage.get('payment').then((val) => {
        this.payment = val;
      });

      const path = window.location.pathname.split('folder/')[1];

      if (path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      }

    });

  }

  async alertLogout(title, msg) {

    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'OK',
          handler: (alertData) => {
            this.platform.ready().then(() => {

              // Cerrar sesión y ocultar side menú
              this.is_logged = false;
              this.router.navigate(['login']);

              //Deshabilitar modo oscuro.
              // this.changeDark();

              this.storage.clear(); //LIMPIAR VARIABLES DE ENTORNO

              this.ngOnInit();

            });

          }
        }
      ]
    });

    await alert.present();


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
          text: 'Cancelar'
        }]
    });

    await alert.present();
  }

}

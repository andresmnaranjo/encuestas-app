import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MypopComponent } from "../popovers/mypop/mypop.component";
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/login.service';
import { LoaderService } from '../loader.service';
import { FolderService } from '../folder/folder.service';
import { EmpresaService } from '../services/empresas.service';
import { CampanaService } from '../services/campanas.service';
import { EncuestaService } from '../services/encuestas.service';
import { PreguntaService } from '../services/preguntas.service';
import { OpcionRespuestaService } from '../services/opcionrespuestas.service';
import { SubPreguntaService } from '../services/subpreguntas.service';
import { OpcionRespuestaSubPreguntaService } from '../services/opcionrespuestasubpregunta.service';
import { toastController } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  public rowsParametersButtons;

  public token: string;
  public _id: string = "";
  public email: string;
  public name: string;
  public lastname: string;
  public login: string;
  public permission: string;
  public typeuser: string;
  public state: string;

  public terms;
  public empresas;
  public campanas;
  public encuestas;
  public encuestadores;

  constructor(public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public vibration: Vibration,
    private popover: PopoverController,
    public router: Router,
    public storage: Storage,
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    public LoginService: LoginService,
    public ionLoader: LoaderService,
    public folderService: FolderService,
    public empresaService: EmpresaService,
    public campanaService: CampanaService,
    public encuestaService: EncuestaService,
    public preguntaService: PreguntaService,
    public opcionRespuestaService: OpcionRespuestaService,
    public subPreguntaService: SubPreguntaService,
    public opcionRespuestaSubPreguntaService: OpcionRespuestaSubPreguntaService,
    public platform: Platform,
    public cd: ChangeDetectorRef,
    public appComponent: AppComponent) {

  }

  ngOnInit() {

    this.cd.detectChanges();

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.set("folder", this.folder);

    this.platform.ready().then(() => {

      switch (this.folder) {
        case "Inicio":
          // this.router.navigate(['inicio']);
          break;

        case "Encuestas":
          this.router.navigate(['folder/encuestas']);
          break;

      }

      this.storage.get('token').then((val) => {
        this.token = val;
      });

      this.storage.get('email').then((val) => {
        this.email = val;
      });

      this.storage.get('name').then((val) => {
        this.name = val;
      });

      this.storage.get('lastname').then((val) => {
        this.lastname = val;
      });

      this.storage.get('login').then((val) => {
        this.login = val;
      });

      this.storage.get('state').then((val) => {
        this.state = val;
      });

      this.storage.get('permission').then((val) => {
        this.permission = val;
      });

      this.storage.get('typeuser').then((val) => {
        //  ENCUESTADOR inició sesión
        if (val == "618dcd3d89fb76248c4e3b47") {
          // Agregar item para usuarios en el panel lateral izquierdo 
          if (this.appComponent.appPages.length == 1) {

            this.appComponent.appPages.push(
              {
                title: "ENCUESTAS",
                url: '/folder/Encuestas',
                icon: 'list'
              }
            );

          }


        } else {

          // if (this.appComponent.appPages.length == 1) {
          //   this.appComponent.appPages.push(
          //     {
          //       title: "ENCUESTAS",
          //       url: '/folder/Encuestas',
          //       icon: 'list'
          //     }
          //   );
          // }
        }
      });

      //Para obtener ID
      this.storage.get('_id').then((val) => {
        this._id = val;
      });

      // //Obtener empresas
      this.empresaService.getAll(this.token).subscribe((result: any) => {
        this.empresas = result.records.length;
        console.log("MSG", result);

      }, (error) => {
        console.log(error);
      });

      // //Obtener campañas
      this.campanaService.getAll(this.token).subscribe((result: any) => {
        this.campanas = result.records.length;
        console.log("MSG", result);

      }, (error) => {
        console.log(error);
      });

      // //Obtener encuestadores
      this.loginService.obtenerUsuarios(this.token).subscribe((result: any) => {
        this.
        encuestadores = result.users.filter(obj => obj.tipousuario.nombre == "Encuestador").length;
        console.log("MSG", result);

      }, (error) => {
        console.log(error);
      });

    });


  }

  async alert(title, msg) {

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
            console.log(alertData);
          }
        }
      ]
    });

    await alert.present();


  }

  doRefresh(event) {
    //console.log('Begin async operation');

    setTimeout(() => {
      //console.log('Async operation has ended');
      this.ngOnInit();

      event.target.complete();
    }, 2000);
  }

  openToastCancel = async (msg) => {
    const toast = await toastController.create({
      color: 'dark',
      duration: 2000,
      message: msg,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
        }
      }]
    });

    this.ionLoader.hideLoader();
    this.ngOnInit();
    toast.present();

  }

  openToastOk = async (msg) => {
    const toast = await toastController.create({
      color: 'dark',
      duration: 3000,
      message: msg,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {

        }
      }]
    });

    this.ionLoader.hideLoader();
    this.ngOnInit();
    toast.present();

  }

  goHome() {
    this.router.navigate(['/folder/Inicio']);
  }

  async CreatePopover(ev: any) {
    const pop = await this.popover.create({
      component: MypopComponent,
      cssClass: 'popover-class',
      event: ev,
      animated: true,

    });
    return await pop.present();
  }

}



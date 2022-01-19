import { ChangeDetectorRef, Component, OnInit, AfterContentChecked, ViewChild } from '@angular/core';
import { LoaderService } from '../loader.service';
import { EmpresaService } from '../services/empresas.service';
import { CampanaService } from '../services/campanas.service';
import { EncuestaService } from '../services/encuestas.service';
import { PreguntaService } from '../services/preguntas.service';
import { ResultadoService } from '../services/resultados.service';
import { OpcionRespuestaService } from '../services/opcionrespuestas.service';
import { SubPreguntaService } from '../services/subpreguntas.service';
import { OpcionRespuestaSubPreguntaService } from '../services/opcionrespuestasubpregunta.service';
import { Storage } from '@ionic/storage';
import { FolderPage } from '../folder/folder.page';
import { AppComponent } from '../app.component';
import { AlertController, IonTextarea, NavController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination, EffectCube } from 'swiper/core';

SwiperCore.use([Pagination, EffectCube]);

import { get } from 'scriptjs';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
})
export class EncuestasComponent implements AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild('textarea', { read: IonTextarea }) textarea: IonTextarea;

  public folder: string;

  public _id: string = "";
  public name: string;
  public lastname: string;
  public login: string;
  public permission: string;
  public typeuser: string;
  public email: string;
  public token: string;
  public state: string;
  public encuestaSelected: string;

  public empresas: [];
  public campanas: [];
  public encuestas: [];
  public preguntas = [];
  public preguntasBackup = [];
  public opcionesrespuesta: [] = [];
  public subpreguntas = [];
  public subpreguntasValidator = [];
  public objValidatorTemp = {};
  public opcionesrespuestasubpreguntas: [] = [];

  public opcionRespuestaSelected;
  public respuestaAbiertaSelected = "";
  public preguntaActual;
  public index = 0;
  public empresa_selected = "";
  public campana_selected = "";
  public encuesta_selected = "";

  public config: SwiperOptions = {
    // slidesPerView: 1,
    spaceBetween: 50,
    pagination: true,
    effect: 'cube'
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private campanaService: CampanaService,
    private encuestaService: EncuestaService,
    private preguntaService: PreguntaService,
    private opcionRespuestaService: OpcionRespuestaService,
    private resultadoService: ResultadoService,
    private subPreguntaService: SubPreguntaService,
    private opcionRespuestaSubPreguntaService: OpcionRespuestaSubPreguntaService,
    public ionLoader: LoaderService,
    public folderPage: FolderPage,
    public appComponent: AppComponent,
    public storage: Storage,
    private navController: NavController,
    public alertController: AlertController,
    public router: Router,
    public cd: ChangeDetectorRef,
  ) {
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({

      });
    }
  }


  swiperSlideChanged(e) {
    this.subpreguntas = null;
  }

  touchAllowed = false;

  next() {
    if (!this.respuestaAbiertaSelected && !this.opcionRespuestaSelected && this.preguntaActual.tipopregunta.nombre != 'Pregunta informativa') {
      return this.alert("Aviso!", "La respuesta es obligatoria.");
    }

    this.index++;

    if (this.subpreguntas && this.subpreguntas.length > 0) {
      const objTemp = this.subpreguntasValidator.filter(obj => obj.pregunta == this.preguntaActual);
      if (!objTemp || objTemp.length == 0) {
        this.subpreguntasValidator.push(this.objValidatorTemp);
        this.objValidatorTemp = null;
      }
      for (let i = 0; i < this.subpreguntas.length; i++) {
        let preguntaTemp = {
          pregunta: "",
          tipopregunta: "",
          opcionesrespuesta: [],
          respuesta: ""
        };
        let opcionesRespuestaTemp = {
          respuesta: {},
        };
        preguntaTemp.pregunta = this.subpreguntas[i].pregunta;
        preguntaTemp.tipopregunta = this.subpreguntas[i].tipopregunta;
        preguntaTemp.respuesta = "";
        //Obtener opciones de respuesta de la subpregunta
        this.opcionRespuestaSubPreguntaService.getBySubPregunta(this.token, this.subpreguntas[i]._id).subscribe((result: any) => {
          for (let j = 0; j < result.record.length; j++) {
            //Limpiar objeto temporal
            opcionesRespuestaTemp = {
              respuesta: ""
            };
            if (result.record[j]) {
              opcionesRespuestaTemp.respuesta = result.record[j];
            }
            preguntaTemp.opcionesrespuesta.push(opcionesRespuestaTemp);
          }
        }, (error2) => {
          console.log(error2);
        });
        if (preguntaTemp) {
          this.preguntas.splice(this.index, 0, preguntaTemp);
        }
      }
    } else {
      let indexCopy = this.index;
      indexCopy--;
      let temp = this.subpreguntasValidator.find(obj => obj.pregunta.pregunta === this.preguntas[indexCopy].pregunta);
      if (temp) {
        for (let i = 0; i < temp.subpreguntas.length; i++) {
          this.preguntas = this.preguntas.filter(function (value, index, arr) {
            return value.pregunta != temp.subpreguntas[i].pregunta;
          });
        }
        this.subpreguntasValidator = this.subpreguntasValidator.filter(function (value, index, arr) {
          return value.pregunta != temp.pregunta;
        });
      }
    }

    if (!this.preguntas[this.index]) {
      this.index--;
      const objPregunta = this.preguntas.find(obj => obj.pregunta === this.preguntaActual.pregunta);
      if (this.preguntaActual.tipopregunta.nombre == 'Pregunta abierta') {
        objPregunta.respuesta = this.respuestaAbiertaSelected;
        this.respuestaAbiertaSelected = "";
      } else if (this.preguntaActual.tipopregunta.nombre == 'Pregunta informativa') {
        objPregunta.respuesta = "N/A";
      } else {
        objPregunta.respuesta = this.opcionRespuestaSelected.respuesta;
        this.opcionRespuestaSelected = "";
      }
      return this.alertFinEncuesta("Aviso!", "¿Desea finalizar la encuesta y almacenar los resultados?");
    } else {
      let self = this;
      self.ionLoader.showLoader();
      const objPregunta = this.preguntas.find(obj => obj.pregunta === this.preguntaActual.pregunta);
      if (this.preguntaActual.tipopregunta.nombre == 'Pregunta abierta') {
        objPregunta.respuesta = this.respuestaAbiertaSelected;
        this.respuestaAbiertaSelected = "";
      } else if (this.preguntaActual.tipopregunta.nombre == 'Pregunta informativa') {
        objPregunta.respuesta = "N/A";
      } else {
        objPregunta.respuesta = this.opcionRespuestaSelected.respuesta;
        this.opcionRespuestaSelected = "";
      }
      setTimeout(function () {
        self.preguntaActual = self.preguntas[self.index];
        self.swiper.swiperRef.slideNext(500);
        self.textarea.setFocus();
        self.ionLoader.hideLoader();
      }, 900);

    }

  }

  prev() {
    this.index--;
    let self = this;
    self.ionLoader.showLoader();
    const objPregunta = this.preguntas.find(obj => obj.pregunta === this.preguntas[this.index].pregunta);
    if (objPregunta.tipopregunta.nombre == 'Pregunta abierta') {
      this.respuestaAbiertaSelected = objPregunta.respuesta;
    } else if (objPregunta.tipopregunta.nombre == 'Pregunta informativa') {
      //No hacer nada
    } else {
      this.opcionRespuestaSelected = objPregunta.respuesta;
    }
    setTimeout(function () {
      self.preguntaActual = self.preguntas[self.index];
      self.swiper.swiperRef.slidePrev(500);
      self.ionLoader.hideLoader();
    }, 900);
  }

  toggleTouch() {
    this.touchAllowed = !this.touchAllowed;
  }

  ngOnInit() {

    this.storage.get('folder').then((val) => {
      this.folder = val;
    });

    this.storage.get('token').then((val) => {
      this.token = val;
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

    this.storage.get('permission').then((val) => {
      this.permission = val;
    });

    this.storage.get('email').then((val) => {
      this.email = val;
    });

    this.storage.get('typeuser').then((val) => {
      this.typeuser = val;
    });

    this.storage.get('state').then((val) => {
      this.state = val;
    });

    this.storage.get('_id').then((val) => {
      this._id = val;

      // //Obtener encuestas
      this.encuestaService.getByEncuestadores(this.token, val).subscribe((result: any) => {
        this.encuestas = result.objTemp.filter(obj => obj.state == true);
        console.log("MSG", result);

      }, (error) => {
        console.log(error);
      });

    });

  }

  // ionViewDidEnter() {
  //   //Para obtener ID
  //   this.storage.get('_id').then((val) => {
  //   });
  // }

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

  async alertFinEncuesta(title, msg) {

    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (alertData) => {
            this.finalizarEncuesta(this.preguntas[this.index].pregunta, this.preguntas[this.index].respuesta.respuesta, this.preguntas);

            // this.ionLoader.showLoader();
            // let self = this;
            // console.log("antes");
            // for (let i = 0; i < this.preguntas.length; i++) {
            //   setTimeout(function () {
            //     console.log("for", i);
            //     self.finalizarEncuesta(self.preguntas[i].pregunta, self.preguntas[i].respuesta.respuesta);
            //   }, 5000);
            // }
            // console.log("despues");
            // this.ionLoader.hideLoader();
          }
        }
      ]
    });

    await alert.present();


  }

  async alertNgOnInit(title, msg) {

    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Aceptar',
          handler: (alertData) => {
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();

  }

  openToastEmail = async (msg) => {
    const toast = await toastController.create({
      color: 'dark',
      duration: 2000,
      message: msg,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          // this.router.navigate(['/login'])
        }
      }]
    });

    toast.present();

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

  seleccionarRespuesta(respuesta, pregunta_actual) {
    this.opcionRespuestaSelected = respuesta;
    this.preguntaActual = pregunta_actual;

    //Validar si la opción de respuesta tiene sub preguntas
    this.subPreguntaService.getByOpcionRespuesta(this.token, respuesta._id).subscribe((result: any) => {

      this.subpreguntas = result.record;

      if (result.record.length > 0) {
        let objValidator = {
          pregunta: "",
          subpreguntas: []
        };
        objValidator.pregunta = pregunta_actual;
        objValidator.subpreguntas = result.record;

        this.objValidatorTemp = objValidator;
      }
    }, (error) => {
      console.log(error);
    });
  }

  onSelectEncuesta() {
    this.encuestaSelected = this.encuestaSelected;

    //Obtener preguntas
    this.preguntaService.getByEncuesta(this.token, this.encuestaSelected).subscribe((result: any) => {
      if (result && result.record.length > 0) {

        this.preguntaActual = result.record[0];
        let listaTemporal = [];
        // this.campanas = result.record;
        for (let i = 0; i < result.record.length; i++) {
          let preguntaTemp = {
            pregunta: "",
            tipopregunta: "",
            opcionesrespuesta: []
          };
          let opcionesRespuestaTemp = {
            respuesta: {},
          };
          preguntaTemp.pregunta = result.record[i].pregunta;
          preguntaTemp.tipopregunta = result.record[i].tipopregunta;
          //Obtener opciones de respuesta de la pregunta
          this.opcionRespuestaService.getByPregunta(this.token, result.record[i]._id).subscribe((result2: any) => {
            // console.log("RESPUESTAS2", result2.record);
            for (let j = 0; j < result2.record.length; j++) {
              //Limpiar objeto temporal
              opcionesRespuestaTemp = {
                respuesta: ""
              };
              if (result2.record[j]) {
                opcionesRespuestaTemp.respuesta = result2.record[j];
              }
              preguntaTemp.opcionesrespuesta.push(opcionesRespuestaTemp);
            }
          }, (error2) => {
            console.log(error2);
          });
          if (preguntaTemp) {
            listaTemporal.push(preguntaTemp);
          }
        }

        this.preguntas = listaTemporal;
        this.preguntasBackup = listaTemporal;

        console.log("this.preguntas");
        console.log(this.preguntas);
      }
      else {

      }

    }, (error) => {
      console.log(error);
    });
  }

  cerrarEncuesta() {
    this.encuestaSelected = null;
  }

  finalizarEncuesta(pregunta, respuesta, preguntas) {
    this.resultadoService.save(this.token,
      {
        encuesta: this.encuestaSelected,
        pregunta: pregunta,
        respuesta: respuesta,
        object: preguntas
      }
    ).subscribe((result: any) => {
      this.alert("OK", "Gracias por haber realizado la encuesta " + result.reqAlmacenado[0].nombre);
      this.encuestaSelected = null;
      this.opcionRespuestaSelected = null;
      this.preguntaActual;
      this.index = 0;
      this.empresa_selected = "";
      this.campana_selected = "";
      this.encuesta_selected = "";

    }, (error) => {
      //Si es una respuesta de error del api
    }
    );
    this.encuestaSelected = null;
  }

  print() {
    console.log("index", this.index);
    console.log("preguntas", this.preguntas);
    console.log("preguntas", this.preguntas[this.index]);
    console.log("pregunta actual", this.preguntaActual);
    console.log("encuesta selected", this.encuestaSelected);
    console.log("opcion de respuesta actual", this.opcionRespuestaSelected);
  }


}

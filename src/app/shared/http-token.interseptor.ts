import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, EMPTY, } from 'rxjs';
import { mergeMap, catchError, } from 'rxjs/operators';
import { from } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable()
export class tokenHeader implements HttpInterceptor {
  constructor(private storage: Storage, private alertCtrl: AlertController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const promise = this.storage.get('access_Token');
    const tokenHeader = from(promise);
    return tokenHeader.pipe(
      mergeMap(token => {
        const cloneReq = this.addToken(request, token);
        return next.handle(cloneReq);
      }),
      catchError((err) => {
        console.log('error: ', err);
        this.presentFailedAlert(err.message);
        return EMPTY;
      }),

    );

  }
  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return clone;
    }
    return request;
  }
  async presentFailedAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Oops',
      message: msg,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}

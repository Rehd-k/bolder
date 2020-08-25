import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import {
  retryWhen,
  delay,
  tap,
  map,
  catchError,
  finalize,
  take,
} from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.loadingCtrl.getTop().then((hasLoading) => {
    //   if (!hasLoading) {
    //     this.loadingCtrl
    //       .create({
    //         spinner: 'circular',
    //         translucent: true,
    //       })
    //       .then((loading) => loading.present());
    //   }
    // });

    return next.handle(request).pipe(
      retryWhen((err) => {
        let retires = 1;
        return err.pipe(
          delay(1000),
          tap(() => {
            this.showRetryToast(retires);
          }),
          map((error) => {
            const retring = retires++;
            if (retring === 3) {
              throw error;
            }
            return error;
          })
        );
      }),
      catchError((err) => {
        console.log('error: ', err);
        if (err.statusText === 'Unknown Error') {
          this.presentFailedAlert('Check your internet connection and try again');
        } else {
          this.presentFailedAlert(err.error.message);
        }
        return EMPTY;
      }),
      finalize(() => {
        this.loadingCtrl.getTop().then((hasLoading) => {
          if (hasLoading) {
            this.loadingCtrl.dismiss();
          }
        });
      })
    );
  }
  async showRetryToast(retryCount: number) {
    const toast = await this.toastCtrl.create({
      message: `Retying: ${retryCount}/3`,
      duration: 1000,
    });
    toast.present();
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

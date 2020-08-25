import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private auth: UserService, private arltCtrl: AlertController, private router: Router) {}


  canActivate(): Observable<boolean> {
    return this.auth.user.pipe(
      map(user => {
        console.log('in canActivate: ', user);
        if (!user) {
          this.arltCtrl.create({
            header: 'Hey there',
            message: 'Please login to continue',
            buttons: [
              {
                text: 'Cancle',
                role: 'cancle'
              },
              {
                text: 'Login ?',
                cssClass: 'dark',
                handler: () => {
                  this.router.navigate(['user']);
                }
              }
            ],
          }).then(alert => alert.present());
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

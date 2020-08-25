import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError, map, switchMap, shareReplay } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'access_Token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userinfo: any;
  public user: Observable<any>;
  private UserData = new BehaviorSubject(null);
  url = environment.url;
  token = 'token';

  constructor(
    private http: HttpClient,
    private plt: Platform,
    private alertController: AlertController,
    private helper: JwtHelperService,
    private storage: Storage,
    private router: Router
  ) {

    this.loadStoredToken();
  }
  loadStoredToken() {
    const platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),

      map((token) => {

        console.log('token from storge: ', token);
        if (token) {
          const decoded = this.helper.decodeToken(token);
          const isExpired = this.helper.isTokenExpired(token);
          if (!isExpired) {
            this.userinfo = decoded;
            console.log('decoded: ', this.userinfo);
            this.UserData.next(decoded);
            return true;
          } else {
            this.storage.remove(TOKEN_KEY);
            return null;
          }
        } else {
          return null;
        }
      })
    );
  }
  getUser() {
    return this.http.get(`${this.url}user/profile`).pipe(
      catchError((e) => {
        const status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}user/login`, credentials)
    .pipe(
      tap((res) => {
        this.router.navigateByUrl('/');
        this.storage.set(TOKEN_KEY, res[this.token]);
        const decoded = this.helper.decodeToken(res[this.token]);
        this.user = decoded;

        this.UserData.next(decoded);
      }),
      shareReplay(),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );

  }
  register(credentials: any): Observable<any> {
    return this.http.post(`${this.url}user/register`, credentials).pipe(

      tap((res) => {
        this.router.navigateByUrl('/');
        this.storage.set(TOKEN_KEY, res[this.token]);
        const decoded = this.helper.decodeToken(res[this.token]);
        this.user = decoded;

        this.UserData.next(decoded);
      })
    );
  }
  updateInfo(userId: string , credentials: string): Observable<any> {
    return this.http.put(`${this.url}user/update/${userId}`, credentials);
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.UserData.next(null);
    });
  }




  showAlert(msg: any) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['Ok'],
    });
    alert.then(alert => alert.present());
  }
}

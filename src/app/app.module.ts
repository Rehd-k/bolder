import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpRequestInterceptor } from './shared/http-loading.interceptor';
import { tokenHeader } from './shared/http-token.interseptor';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LikePageModule} from './pages/sellers/sellers-details/like/like.module';
import { CommentsPageModule } from './pages/sellers/sellers-details/comments/comments.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SearchPageModule } from './pages/search/search.module';
import { DescriptionsPageModule } from './pages/index/product-details/descriptions/descriptions.module';
import { ReviewsPageModule } from './pages/index/product-details/reviews/reviews.module';
import { UserinfoPageModule } from './pages/account/userinfo/userinfo.module';
import { LivechatPageModule } from './pages/support/livechat/livechat.module';
import { SellerReviewsPageModule } from './pages/sellers/sellers-details/seller-reviews/seller-reviews.module';



const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export function jwtOptionsFactory(storage: { get: (arg0: string) => any }) {
  return {
    tokenGetter: () => {
      return storage.get('access_Token');
    },
    whitelistedDomains: ['http://localhost:3000/api'],
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    }),
    LikePageModule,
    CommentsPageModule,
    SocketIoModule.forRoot(config),
    SearchPageModule,
    DescriptionsPageModule,
    ReviewsPageModule,
    UserinfoPageModule,
    LivechatPageModule,
    SellerReviewsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: tokenHeader,
      multi: true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    Rave,
    RavePayment,
    Misc,
    InAppBrowser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

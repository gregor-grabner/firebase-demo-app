import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import {Camera} from "@ionic-native/camera";
import {HttpClientModule} from "@angular/common/http";
import {LoginPageModule} from "../pages/login/login.module";
import {SignupPageModule} from "../pages/signup/signup.module";
import {ResetPasswordPageModule} from "../pages/reset-password/reset-password.module";
import { PersonProvider } from '../providers/person/person';

import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import localeDeAtExtra from '@angular/common/locales/extra/de-AT';
import {FormsPage} from "../pages/forms/forms";
import { BookingProvider } from '../providers/booking/booking';
registerLocaleData(localeDeAt, localeDeAtExtra);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    SignupPageModule,
    ResetPasswordPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    PersonProvider, // ddb-done
    {
      provide: LOCALE_ID,
      useValue: 'de-AT'
    },
    BookingProvider
  ]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ResultadoDetailPage } from '../pages/resultado-detail/resultado-detail';
import { LoginPage } from '../pages/login/login';
import { CadastrarUsuarioPage } from '../pages/cadastrar-usuario/cadastrar-usuario';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StorageProvider } from '../providers/storage/storage';
import { SQLite } from '@ionic-native/sqlite';
import { PopoverComponent } from '../components/popover/popover';
import { AdMobFree } from '@ionic-native/admob-free';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ResultadoDetailPage,
    PopoverComponent,
    LoginPage,
    CadastrarUsuarioPage
  ],
  imports: [
    HttpClientModule,
    PipesModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ResultadoDetailPage,
    PopoverComponent,
    LoginPage,
    CadastrarUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    SQLite,
    LocalStorageProvider
  ]
})
export class AppModule {}

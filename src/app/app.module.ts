import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ResultadoDetailPage } from '../pages/resultado-detail/resultado-detail';
import { LoginPage } from '../pages/login/login';
import { CadastrarUsuarioPage } from '../pages/cadastrar-usuario/cadastrar-usuario';
import { RespostaSalvaPage } from '../pages/resposta-salva/resposta-salva'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StorageProvider } from '../providers/storage/storage';
import { SQLite } from '@ionic-native/sqlite';
import { PopoverComponent } from '../components/popover/popover';
import { AdMobPro } from '@ionic-native/admob-pro';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { PipesModule } from '../pipes/pipes.module';
import { Mask } from '../directives/mask/mask';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultadoDetailPage,
    PopoverComponent,
    LoginPage,
    CadastrarUsuarioPage,
    RespostaSalvaPage,
    Mask,
    RecuperarSenhaPage
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
    HomePage,
    ResultadoDetailPage,
    PopoverComponent,
    LoginPage,
    CadastrarUsuarioPage,
    RespostaSalvaPage,
    RecuperarSenhaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    AdMobPro,
    SQLite,
    LocalStorageProvider
  ]
})
export class AppModule {}

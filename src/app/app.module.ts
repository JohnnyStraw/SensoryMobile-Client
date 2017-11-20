import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DeviceMotion } from '@ionic-native/device-motion';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SettingsModal } from '../pages/settings-modal/settings-modal';

import { UploadService } from '../services/upload.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsModal
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceMotion,
    File,
    FileTransfer,
    UploadService,    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

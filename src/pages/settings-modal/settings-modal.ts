import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { UploadService } from '../../services/upload.service';


@Component({
  templateUrl: 'settings-modal.html'
})
export class SettingsModal {
  url: string;

  constructor(public viewCtrl: ViewController, private uploadService: UploadService) {
      this.url = this.uploadService.getServerURL();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.uploadService.setServerURL(this.url);
    //toast show save
  }
}
import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { SettingsModal } from '../settings-modal/settings-modal';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list: Array<string>;
  selectedActivity: string;
  dataCollected: boolean;
  sensing: boolean;
  data: Array<Object>;
  currentValues: string;

  subscription: any;

  //feltöltöm kiinduló adatokkal a listát, ezek az activity-k, amelyek közben a mozgást akarjuk mérni
  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public toastCtrl: ToastController, 
    private uploadService: UploadService,
    private deviceMotion: DeviceMotion) {
    this.list = [
      "Standing",
      "Walking",
      "Running",
      "Stairs",
      "Train"
    ];
    this.selectedActivity = "";
    this.dataCollected = false;
    this.sensing = false;
    this.data = [];
    this.currentValues = "";
  }

  setActivity(activity) {
    if(!this.dataCollected) {
      this.selectedActivity = activity;
    } else {
      this.createToast('A collecting proceedure is ongoing, please upload the collected data before changing the activity!');
    }
  }

  getStyle(activity) {
    if(activity === this.selectedActivity) {
      return "grey"
    }
    return "";
  }

  startSensing() {
    if(!this.selectedActivity) this.selectedActivity = this.list[0];
    this.sensing = true;
    this.subscription = this.deviceMotion.watchAcceleration({frequency: 100}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.currentValues = acceleration.x + " " + acceleration.y + " " + acceleration.z;
      this.data.push({
        timestamp: acceleration.timestamp,
        xAxis: acceleration.x,
        yAxis: acceleration.y,
        zAxis: acceleration.z
      });
    });
  }

  stopSensing() {
    this.sensing = false;
    this.subscription.unsubscribe();
    if(this.data.length > 0) {
      this.dataCollected = true;      
    }
    this.currentValues = "";
  }

  uploadData() {
    this.dataCollected = false;
    if(this.uploadService.getServerURL()) {
      this.uploadService.uploadData(this.data, this.selectedActivity).then(() => {
        this.createToast('Upload successful');
        this.data = [];
      }).catch(() => {
        this.createToast('Upload error, please check if server is available');
        this.dataCollected = false;
      });
    } else {
      this.createToast('You need to provide the server url!');
      this.openModal();
    }
  }

  openModal() {
    let myModal = this.modalCtrl.create(SettingsModal);
    myModal.present();
  }

  createToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

}

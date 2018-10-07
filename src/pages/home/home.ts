import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today: Date = new Date(); // 今天的时间
  constructor(public navCtrl: NavController) {

  }

}

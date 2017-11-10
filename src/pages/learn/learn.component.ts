import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AsanaService} from "./asana.service";

@Component({
  selector: 'page-learn',
  templateUrl: 'learn.component.html'
})
export class LearnComponent {

  constructor(public navCtrl: NavController,
              private asanaService: AsanaService) {

  }

}

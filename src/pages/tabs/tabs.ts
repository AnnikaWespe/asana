import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LearnComponent } from '../learn/learn.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LearnComponent;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}

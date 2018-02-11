import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="container" style="width:400;">
      <p style="text-align:center">All Rights Reserved 2018</p>
    </div>
    `
})
export class FooterComponent{
  title: string = 'Footer';
}

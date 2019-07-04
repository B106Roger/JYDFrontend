import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account = '';
  password = '';
  remember = false;
  constructor(public route: Router) { }

  ngOnInit() {
  }

  getRememberValue() {return this.remember; }
  getRememberStyle() {
    const displayVal = this.getRememberValue() === true ? 'inline' : 'none';
    return { display: displayVal };
  }
  toggleRemeberValue() {this.remember = !this.remember; }
  login() {
    console.log('account: ', this.account);
    if (this.account === '123' && this.password === '123') {
      this.displayNotification();
      this.route.navigate(['lobby']);
    }
  }

  displayNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg === undefined) {console.log('ServiceWorker are denied'); return; }
        const options = {
          icon: 'assets/icons/jyd-128x128.png',
          body: 'Have fun in JYD world!!',
          image: 'assets/icons/jyd-128x128.png'
        };
        console.log(JSON.stringify(reg));
        reg.showNotification('Wellcome to JYD', options);
        console.log(reg);
      });
    } else {
      console.log('Notification are denied');
    }
  }
}

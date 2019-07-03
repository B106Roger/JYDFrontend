import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'JYDFrontend';
  updates = false;
  applicationServerPublicKey = `BPkIUOIylNfWjC9MQ3_8oVx0MsaryiEaak1WyYWyqWp1-FuyQitttiMkdjvACkoEds94crwhyRIyVTyc2tVYICI`;

  constructor(public swupdate: SwUpdate) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: 'AIzaSyDrUmsHPckP2IB3-yH2bnOEWWBuhZshzLw',
    authDomain: 'jydfrontend.firebaseapp.com',
    databaseURL: 'https://jydfrontend.firebaseio.com',
    projectId: 'jydfrontend',
    storageBucket: 'jydfrontend.appspot.com',
    messagingSenderId: '305211537179',
    appId: '1:305211537179:web:aeb398524cdf1853'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);



  }
  ngOnInit(): void {
    // 當有新東西時更新pwa cache
    this.swupdate.available.subscribe(event => {
      this.updates = true;
      this.swupdate.activateUpdate().then(() => {
        document.location.reload();
      });
    });

    // 詢問瀏覽器是否接受通知
    if ('serviceWorker' in navigator) {
      Notification.requestPermission((status) => {
        console.log('Notification permission status:', status);
      });
      let hel: any = self;
      hel.addEventListener('push', event => {
        console.log('[Service Worker] Push Received.');
        let title = 'Server Push';
        let options = {
          title: 'abc',
          body: 'push TEST',
          icon: './assets/images/android_048.png'
        };
        if (event.data) {
          options = event.data.json();
          title = options.title;
        }
        event.waitUntil(hel.registration.showNotification(title, options));
      });
      navigator.serviceWorker.getRegistration().then(reg => {
        this.subscribeUser(reg);
      });
    }
  }

  subscribeUser(swRegistration) {
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(subscription => {
        console.log('User is subscribed');
        console.log(JSON.stringify(subscription));
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      });
  }

  urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }



}

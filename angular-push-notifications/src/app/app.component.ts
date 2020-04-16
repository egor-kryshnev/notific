import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';
const VAPID_PUBLIC = "BECIhe7HE1lj3oIy4EHjCiLV0r8M5q4EbMRSzKHVjLMo-5u70-BSvzQprJAgkhwgWL6HRq02NnVBQCyvAmxNqU4";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-push-notifications';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
    }
  }
}

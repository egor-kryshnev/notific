import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const SERVER_URL = 'http://localhost:3000/subscription';
// const SERVER_URL = 'http://192.168.1.13:3000/subscription';
const SERVER_URL = 'https://notification-angular.herokuapp.com/subscription';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }
}

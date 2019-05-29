/* eslint-disable class-methods-use-this */
import { NotificationService, Notification } from '@/services/types/Notification';
import * as firebase from 'firebase';
import 'firebase/messaging';

export default class FirebaseNotificationService implements NotificationService {
  subscribe(handler: (notification: Notification) => {}) {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .catch((error) => {
        console.log('Unable to get permission to notify.', error);
      });

    messaging.getToken()
      .then(e => console.log(e));
    messaging.onMessage((payload) => {
      handler(new Notification(payload.data.title, payload.data.body));
    });
  }
}

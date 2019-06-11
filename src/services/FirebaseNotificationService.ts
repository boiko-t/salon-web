/* eslint-disable class-methods-use-this */
import { NotificationService, Notification } from '@/services/types/Notification';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

export default class FirebaseNotificationService implements NotificationService {
  async subscribe(handler: (notification: Notification) => {}) {
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      handler(new Notification(payload.notification.title, payload.notification.body));
    });
    const token = await messaging.getToken();
    const dbService = new FirebaseDatabaseService();
    try {
      messaging.requestPermission();
      dbService.updateData('notificationTokens', { [token]: true });
      return Promise.resolve();
    } catch (e) {
      dbService.updateData('notificationTokens', { [token]: false });
      return Promise.reject(e);
    }
  }
}

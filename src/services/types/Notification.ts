export class Notification {
    private title: string;
    private body: string;

    constructor(title: string, body: string) {
      this.title = title;
      this.body = body;
    }

    setTitle(value: string) {
      this.title = value;
    }

    setBody(value: string) {
      this.body = value;
    }

    getTitle() {
      return this.title;
    }

    getBody() {
      return this.body;
    }
}

export interface NotificationService {
    subscribe(handler: (notification: Notification) => {});
}

curl -X POST -H "Authorization: key=AAAAkQiehuA:APA91bGefUxSDFlOV7qAOtCV03qW0O_eIZKeuBEK4ut-osnoxJW_NHlr7ea7FSWPxlHADbiGWAOBwuSsS9b7zOu6yqrxXE-Z2jPP_IWi_kc28A3V7UcsUDXykE-_SvCwFS20t0x6ypyD" -H "Content-Type: application/json" -d '{
  "data": {
    "title": "Portugal vs. Denmark",
    "body": "kk10443",
    "icon": "https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Notification-512.png",
    "click_action": "https://localhost:8080"
  },
  "to": "dbFtW2SpB_0:APA91bFE0Wa0a9kaqdQwSE4A0Y5qUyWNCSCU9_Sjpi3dBVIjfAcLgNBMwNpyJ2rpfdvmMrcHegguqO9-5L60L46rxqc8H1yGLYOV5cFWWm1hWMpQlxQNwOy28P3ak6ykyU19X4hO7mDI"
}' "https://fcm.googleapis.com/fcm/send"
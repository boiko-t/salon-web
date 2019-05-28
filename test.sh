curl -X POST -H "Authorization: key=AAAAkQiehuA:APA91bGefUxSDFlOV7qAOtCV03qW0O_eIZKeuBEK4ut-osnoxJW_NHlr7ea7FSWPxlHADbiGWAOBwuSsS9b7zOu6yqrxXE-Z2jPP_IWi_kc28A3V7UcsUDXykE-_SvCwFS20t0x6ypyD" -H "Content-Type: application/json" -d '{
  "data": {
    "title": "Portugal vs. Denmark",
    "body": "kk10443",
    "icon": "https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Notification-512.png",
    "click_action": "https://localhost:8081"
  },
  "to": "edP5cUkgEqA:APA91bElH4fBWC8JcQr00XJ09WozQQr3mIFdeQTJl4RPndh6AdVSsoaE_-INaCPaowR8qkiCgodrIX5BELuD0URxXckuALofIwCGvBvzc0MWMWxcFIO8hV8VNRJUHiEXTfZDjx3_HGqm"
}' "https://fcm.googleapis.com/fcm/send"
curl -X POST -H "Authorization: key=AAAAkQiehuA:APA91bGefUxSDFlOV7qAOtCV03qW0O_eIZKeuBEK4ut-osnoxJW_NHlr7ea7FSWPxlHADbiGWAOBwuSsS9b7zOu6yqrxXE-Z2jPP_IWi_kc28A3V7UcsUDXykE-_SvCwFS20t0x6ypyD" -H "Content-Type: application/json" -d '{
  "data": {
    "title": "Portugal vs. Denmark",
    "body": "kk10443",
    "icon": "https://cdn0.iconfinder.com/data/icons/essentials-solid/100/Notification-512.png",
    "click_action": "https://localhost:8081"
  },
  "to": "e9HomZDz5a8:APA91bHkPoNitWRIaD6aMPB1iSP6yuu7Paww5ABx2Uo9erU3C3YfScSQjaqVedpjd1JLIGV36C3VCh-J_m5m5YyDrvYOHFD_5ALLx0Dxh3zTLhwpqdL7hMp4GJ4iUunP4FU-iVo_n8uh"
}' "https://fcm.googleapis.com/fcm/send"
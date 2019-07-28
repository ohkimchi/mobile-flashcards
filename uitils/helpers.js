import { Notifications, Permissions } from "expo"
import { Alert } from "react-native"
import { AsyncStorage } from "react-native-web"

export function alertMsg(title, msg, callback) {
  return Alert.alert(title, msg, [{ text: "OK", onPress: () => callback() }])
}

function createNotification() {
  return {
    title: "Daily reminder!",
    body: "Have you studied today?",
    ios: { sound: true },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  }
}

const NOTIFICATION_KEY = "MobileFlashcards:notifications"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()
            const tmr = new Date()
            tmr.setDate(tmr.getDate() + 1)
            tmr.setHours(20)
            tmr.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tmr,
              repeat: "day",
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}

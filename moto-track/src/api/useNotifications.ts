import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export function useNotifications() {

  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }, []);
}
export async function solicitarPermissaoNotificacoes() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}
export async function enviarNotificacao(titulo: string, corpo: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: true,
    },
    trigger: null, 
  });
}


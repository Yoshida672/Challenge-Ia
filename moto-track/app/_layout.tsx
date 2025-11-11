import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "~/src/context/ThemeContext";
import { AuthProvider } from "~/src/context/AuthContext";
import { useNotifications } from "~/src/api/useNotifications";

export default function Layout() {
  useNotifications(); // inicializa notificações

  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack screenOptions={{ animation: "slide_from_right" }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastroMoto" options={{ headerShown: false }} />
          <Stack.Screen
            name="cadastroCondicoes"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="listaCondicoes"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="mapa" options={{ headerShown: false }} />
          <Stack.Screen name="listaMotos" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="sobre" options={{ headerShown: false }} />
          <Stack.Screen name="sobreApp" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}

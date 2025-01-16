import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../global.css";
import Welcome from "./auth/welcome";

export default function AppLayout() {
  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}

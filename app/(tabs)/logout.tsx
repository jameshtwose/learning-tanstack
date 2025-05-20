import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function LogoutScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    // Clear the JWT/auth data from cache
    queryClient.removeQueries({ queryKey: ["auth"] });
    // Redirect to login page
    router.replace("/login");
  }, [queryClient, router]);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
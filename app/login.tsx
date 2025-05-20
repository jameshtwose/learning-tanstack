import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("user@example.com");
  const [password, setPassword] = useState("string");
  const loginMutation = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (loginMutation.status === "success") {
      router.replace("/"); // Redirect to index
    }
  }, [loginMutation.status, router]);

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => loginMutation.mutate({ username, password })}
      />
      {loginMutation.status === "pending" && <Text>Loading...</Text>}
      {loginMutation.status === "error" && (
        <Text>Error: {loginMutation.error?.message}</Text>
      )}
      {loginMutation.status === "success" && <Text>Logged in!</Text>}
    </View>
  );
}